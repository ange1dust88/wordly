from django.contrib.auth.models import User
from rest_framework import serializers

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
