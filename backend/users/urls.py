from django.urls import path
from .views import PrivateView, PublicView, CheckEmailView, UpdateProfileImageView

urlpatterns = [
    path('api/v1/user/check-email/', CheckEmailView.as_view(), name='check-email'),
    path("private-view", PrivateView.as_view(), name="private view"),
    path("public-view", PublicView.as_view(), name="public view"),
    path('api/v1/user/update-profile-image/', UpdateProfileImageView.as_view(), name='update-profile-image'),
]
