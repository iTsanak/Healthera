from django.db import models
import uuid
from django.conf import settings


class ImageAnalysis(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='image_analyses')
    image = models.ImageField(upload_to='images/')
    result = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, default='pending')

    def __str__(self):
        return f"Image Analysis {self.id} - User: {self.user.username} - Status: {self.status}"
