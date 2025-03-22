from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Module, Word


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},  
        }

    def create(self, validated_data):
        email = validated_data.get("email").lower()
        username = validated_data.get("username").lower()
        password = validated_data.pop("password")  


        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "email has already been taken."})
        
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "username has already been taken."})

        user = User.objects.create_user(username=username, email=email, password=password)
        return user


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['id', 'term', 'definition', 'image']

class ModuleSerializer(serializers.ModelSerializer):
    words = WordSerializer(many=True)  

    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'creator_name', 'words']
