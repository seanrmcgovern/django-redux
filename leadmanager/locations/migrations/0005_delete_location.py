# Generated by Django 3.1.6 on 2021-02-28 20:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0004_remove_location_coordinates'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Location',
        ),
    ]
