from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny


class PublicView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response({"message": "This is a public endpoint"})


class PrivateView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response({"message": "This is a private endpoint"})
