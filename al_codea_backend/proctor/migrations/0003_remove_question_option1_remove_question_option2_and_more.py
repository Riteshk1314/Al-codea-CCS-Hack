# Generated by Django 5.0.6 on 2024-06-09 12:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proctor', '0002_alter_question_option4'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='option1',
        ),
        migrations.RemoveField(
            model_name='question',
            name='option2',
        ),
        migrations.RemoveField(
            model_name='question',
            name='option3',
        ),
        migrations.RemoveField(
            model_name='question',
            name='option4',
        ),
    ]
