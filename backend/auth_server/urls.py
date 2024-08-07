from django.urls import path, include
from .views import CustomLoginView, CustomTokenRefreshView, CustomRegisterView
from dj_rest_auth.views import PasswordResetConfirmView

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('api/v1/auth/default/', include('dj_rest_auth.urls')),
    # path('api/v1/auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('api/v1/auth/password/reset/confirm/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('api/v1/auth/login/', CustomLoginView.as_view(), name='custom_login'),
    path('api/v1/auth/register/',
         CustomRegisterView.as_view(), name='custom_register'),
    path('api/v1/auth/jwt/refresh/', CustomTokenRefreshView.as_view(),
         name='custom_token_refresh'),
]
