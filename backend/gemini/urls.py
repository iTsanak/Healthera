from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_image, name='upload_image'),
    path('check-analysis/<uuid:uuid>/',
         views.check_analysis, name='check_analysis'),
]
