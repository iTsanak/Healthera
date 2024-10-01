from datetime import timedelta
from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from dj_rest_auth.utils import jwt_encode
from dj_rest_auth.models import get_token_model
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from .serializers import CustomLoginSerializer, CustomTokenRefreshSerializer, CustomRegisterSerializer
from users.models import User

from django.conf import settings


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    def get_response(self):
        serializer_class = self.get_response_serializer()
        serializer = serializer_class(instance=self.token)
        data = serializer.data

        refresh = RefreshToken.for_user(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        response = Response(data, status=status.HTTP_200_OK)
        return response


class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer

    # def get_serializer_class(self):
    #     return CustomLoginSerializer

    def login(self):
        self.user = self.serializer.validated_data['user']
        self.user.device_id = self.serializer.validated_data['device_id']
        token_model = get_token_model()

        if api_settings.USE_JWT:
            self.access_token, self.refresh_token = jwt_encode(self.user)
        elif token_model:
            self.token = api_settings.TOKEN_CREATOR(
                token_model, self.user, self.serializer)

        if api_settings.SESSION_LOGIN:
            self.process_login()

    def get_response(self):
        response = super().get_response()

        user_data = {
            "pk": str(self.user.pk),
            "username": self.user.username,
            "email": self.user.email,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "imageURL": self.user.profile_image_url,
        }

        response.data["user"] = user_data
        return response

    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        self.serializer.save()

        self.login()
        return self.get_response()


class CustomTokenRefreshView(APIView):
    # permission_classes = (IsAuthenticated,)
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenRefreshSerializer
    token_class = RefreshToken

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        # user_id = serializer.validated_data['user']['id']
        old_refresh_token = serializer.validated_data['refresh']

        old_refresh_token.set_exp(
            settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'])

        # # Blacklist the old refresh token
        # try:
        #     old_refresh_token.blacklist()
        # except AttributeError:
        #     pass

        # # Generate a new refresh token and access token
        # user = User.objects.get(id=user_id)
        # access_token, refresh_token = jwt_encode(user)

        response_data = {
            'refresh': str(old_refresh_token),
            'access': str(old_refresh_token.access_token),
        }

        return Response(response_data, status=status.HTTP_200_OK)


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = self.get_response_data(user)

        if data:
            response = Response(
                data,
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        else:
            response = Response(
                status=status.HTTP_204_NO_CONTENT, headers=headers)

        return response
