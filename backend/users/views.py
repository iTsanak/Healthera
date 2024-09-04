from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import User


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
