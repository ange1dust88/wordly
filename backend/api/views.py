from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view 
from django.contrib.auth.models import User
from requests import Response
from .serializers import UserSerializer, ModuleSerializer
from rest_framework.permissions import AllowAny
from environ import Env
from rest_framework import status, generics
from .models import Module
from rest_framework.views import APIView



env = Env()
env.read_env()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ModuleListView(generics.ListAPIView):
    queryset = Module.objects.all() 
    serializer_class = ModuleSerializer


@csrf_exempt  
@api_view(['POST'])
def create_module(request):
    if request.method == 'POST':
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class GetModuleByCodeView(APIView):
    permission_classes = [AllowAny]  # 

    def get(self, request, code, *args, **kwargs):
        try:
            module = Module.objects.get(code=code)
            serializer = ModuleSerializer(module)
            return Response(serializer.data)
        except Module.DoesNotExist:
            return Response({"detail": "Module not found."}, status=status.HTTP_404_NOT_FOUND)
