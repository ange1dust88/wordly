from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Module, Card


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
    

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['term', 'definition']
class ModuleSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True) 

    class Meta:
        model = Module
        fields = ['title', 'description', 'creator_name', 'cards', 'code']  

    def create(self, validated_data):
        cards_data = validated_data.pop('cards')  

        module = Module.objects.create(**validated_data)

        for card_data in cards_data:
            Card.objects.create(module=module, **card_data)

        return module