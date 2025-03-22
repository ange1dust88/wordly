from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path, include
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.views import OAuth2CallbackView, OAuth2LoginView
from api.views import CreateUserView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name = "register"),
    path("api/token/", TokenObtainPairView.as_view(), name = "get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name = "refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("accounts/", include('allauth.urls')),
]
