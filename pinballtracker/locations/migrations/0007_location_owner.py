# Generated by Django 3.1.6 on 2021-03-01 01:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('locations', '0006_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='locations', to=settings.AUTH_USER_MODEL),
        ),
    ]
