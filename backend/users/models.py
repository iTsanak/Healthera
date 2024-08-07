from django.contrib.auth.models import AbstractUser
import uuid
from django.db import models


class User(AbstractUser):
    # Auto-created id field from Django's Model class
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.CharField(max_length=15, blank=True)
    imageURL = models.CharField(blank=True, max_length=500)
    device_id = models.CharField(blank=True, max_length=200)
    dob = models.DateField(null=True, blank=True)
