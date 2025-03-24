from django.contrib import admin
from django.urls import path, include
from api import views
from api.views import CreateUserView, GetModuleByCodeView, ModuleListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import CreateUserView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name = "register"),
    path("api/token/", TokenObtainPairView.as_view(), name = "get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name = "refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("accounts/", include('allauth.urls')),
    path('create-module/', views.create_module, name='create_module'),
    path('modules/', ModuleListView.as_view(), name='module-list'),
    path('modules/<str:code>/', GetModuleByCodeView.as_view(), name='get_module_by_code'),
]
