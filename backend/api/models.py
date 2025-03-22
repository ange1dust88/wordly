from django.db import models
from django.contrib.auth.models import User



class Module(models.Model):
    title = models.CharField(max_length=255)  
    description = models.TextField()  
    creator_name = models.CharField(max_length=255, default='Unknown') 
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.title
    def __str__(self):
        return self.title

class Word(models.Model):
    module = models.ForeignKey(Module, related_name='words', on_delete=models.CASCADE)  
    term = models.CharField(max_length=255)  
    definition = models.TextField()  
    image = models.ImageField(upload_to='words_images/', null=True, blank=True)  

    def __str__(self):
        return self.term

