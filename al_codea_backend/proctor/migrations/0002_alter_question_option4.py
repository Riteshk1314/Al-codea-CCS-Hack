# Generated by Django 5.0.6 on 2024-06-05 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proctor', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='option4',
            field=models.CharField(default='none of these', max_length=1000),
        ),
    ]
