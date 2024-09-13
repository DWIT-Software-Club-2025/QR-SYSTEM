from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import MyModel
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
import json
import base64


@method_decorator(csrf_exempt, name='dispatch')
class MyModelCreateView(View):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            data = json.loads(request.body)
            print(data.get("value"))
            base64_data = str(data.get("value"))
            decoded_data = base64.b64decode(base64_data).decode('utf-8')
            data_list = decoded_data.split(':')
            id = data_list[0]
            name = data_list[1]

            try:
                my_model_instance, created = MyModel.objects.get_or_create(
                    id=id,
                    defaults={'name': name, 'status': True}
                )
                if created:
                    return JsonResponse({'id': my_model_instance.id, 'name': my_model_instance.name, 'status': my_model_instance.status})
                else:
                    return JsonResponse({'message': 'Entry already exists', 'id': my_model_instance.id, 'name': my_model_instance.name, 'status': my_model_instance.status})
            except IntegrityError:
                return JsonResponse({'error': 'Integrity error occurred'}, status=400)

        my_model_instance = MyModel.objects.create(
            name=name, id=id, status=True)
        return JsonResponse({'id': my_model_instance.id, 'name': my_model_instance.name, 'status': my_model_instance.status})


def get(request):
    if request.method == 'GET':
        my_model_instance = MyModel.objects.all()
        entries = [{
            "id": instance.id,
            "name": instance.name,
            "status": instance.status
        }for instance in my_model_instance]
        return JsonResponse({
            "val": entries
        })
