# admin.py
from django.contrib import admin
from .models import MyModel


@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    # Customize the list display if needed
    list_display = ('name', 'id', 'status')


# admin.site.register(MyModel)
