from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext_lazy as _
from users.serializers import UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user'] = UserSerializer(user).data
        return token


class CustomTokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField(required=True)
    device_id = serializers.CharField(required=True)

    def validate(self, attrs):
        refresh = attrs['refresh']
        device_id = attrs['device_id']

        try:
            token = RefreshToken(refresh)
        except Exception:
            raise serializers.ValidationError("Invalid refresh token")

        # Check if the device_id matches
        if token['user']['device_id'] != device_id:
            raise serializers.ValidationError("Device ID does not match")

        # Get the user
        user = token['user']

        attrs['user'] = user
        attrs['refresh'] = token
        return attrs


class CustomLoginSerializer(LoginSerializer):
    device_id = serializers.CharField(required=True)

    def save(self, **kwargs):
        # Perform the default validation
        data = super().validate(self.data)

        # Save the device_id to the user model
        user = data["user"]
        device_id = self.validated_data['device_id']
        user.device_id = device_id
        user.save(update_fields=['device_id'])

        return data


class CustomRegisterSerializer(RegisterSerializer):
    device_id = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)

    last_name = serializers.CharField(required=False, allow_blank=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    dob = serializers.DateField(required=False)

    def save(self, request):
        user = super().save(request)
        user.device_id = self.validated_data['device_id']
        user.first_name = self.validated_data['first_name']
        user.last_name = self.validated_data.get('last_name', '')
        user.phone_number = self.validated_data.get('phone_number', '')
        user.dob = self.validated_data.get('dob', None)
        user.save()
        return user
