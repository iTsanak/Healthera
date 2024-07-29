from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Auto-created id field from Django's Model class
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    dob = models.DateField(null=True, blank=True)