from django.contrib import admin
from django.urls import path, include
from .views import health_check

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("auth_server.urls")),
    path("", include("users.urls")),
    path("", health_check),
]
