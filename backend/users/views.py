import os

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.conf import settings

from .serializers import ProfileImageUploadSerializer
from .models import User

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from uuid import uuid4


class PublicView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response({"message": "This is a public endpoint"})


class PrivateView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response({"message": "This is a private endpoint"})


class CheckEmailView(APIView):
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({"message": "Email is already in use.", "code": "IN_USE"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Email is available.", "code": "AVAILABLE"}, status=status.HTTP_200_OK)


class UpdateProfileImageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        # Handle the uploaded image
        image = request.FILES.get('image')
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the image to the media directory
        image_name = f"profile_images/{uuid4()}.jpg"
        image_path = default_storage.save(image_name, ContentFile(image.read()))

        # Generate the full image URL
        image_url = os.path.join(settings.MEDIA_URL, image_name)

        # Update the user's profile_image_url
        user.profile_image_url = image_url
        user.save()

        # Return success response
        return Response({'profile_image_url': image_url}, status=status.HTTP_200_OK)
