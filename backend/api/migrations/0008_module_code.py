# Generated by Django 5.1.7 on 2025-03-23 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_card_image_remove_module_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='code',
            field=models.CharField(blank=True, max_length=255, unique=True),
        ),
    ]
