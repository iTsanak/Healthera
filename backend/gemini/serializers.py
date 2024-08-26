from rest_framework import serializers
from .models import ImageAnalysis


class ImageAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageAnalysis
        fields = ['id', 'result', 'created_at', 'updated_at', 'status']
