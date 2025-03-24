# Generated by Django 5.1.7 on 2025-03-22 23:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_name_module_title_module_creator_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='card',
            old_name='translation',
            new_name='term',
        ),
        migrations.RemoveField(
            model_name='card',
            name='word',
        ),
        migrations.AddField(
            model_name='card',
            name='definition',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='card',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='card_images/'),
        ),
        migrations.AlterField(
            model_name='module',
            name='creator_name',
            field=models.CharField(default='Unknown', max_length=255),
        ),
    ]
