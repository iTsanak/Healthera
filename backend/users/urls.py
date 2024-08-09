from django.urls import path
from .views import PrivateView, PublicView, CheckEmailView

urlpatterns = [
    path('api/v1/user/check-email/', CheckEmailView.as_view(), name='check-email'),
    path("private-view", PrivateView.as_view(), name="private view"),
    path("public-view", PublicView.as_view(), name="public view"),
]
