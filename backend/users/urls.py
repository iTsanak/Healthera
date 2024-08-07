from django.urls import path
from .views import PrivateView, PublicView

urlpatterns = [
    path("private-view", PrivateView.as_view(), name="private view"),
    path("public-view", PublicView.as_view(), name="public view"),
]
