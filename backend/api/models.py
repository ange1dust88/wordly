import random
import string
from django.db import models


class Module(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    creator_name = models.CharField(max_length=100)
    code = models.CharField(max_length=255, unique=True, blank=True) 

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.code: 
            self.code = self.generate_code()  
        super().save(*args, **kwargs) 

    def generate_code(self):
        characters = string.ascii_letters + string.digits + "$#@!"
        return ''.join(random.choice(characters) for _ in range(32)) 

    
class Card(models.Model):
    term = models.CharField(max_length=100)
    definition = models.TextField()
    module = models.ForeignKey(Module, related_name="cards", on_delete=models.CASCADE)

    def __str__(self):
        return self.term


