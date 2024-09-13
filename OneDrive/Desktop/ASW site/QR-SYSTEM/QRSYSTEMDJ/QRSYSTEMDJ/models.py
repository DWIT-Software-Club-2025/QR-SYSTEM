from django.db import models
from django.utils.translation import gettext_lazy as _


class MyModel(models.Model):
    name = models.CharField(max_length=100)
    id = models.IntegerField(_("ID"), primary_key=True)
    status = models.BooleanField(_("Scanned"))
