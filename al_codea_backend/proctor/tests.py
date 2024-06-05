from django.test import TestCase
from .models import  Topic

from django.shortcuts import render
# Create your tests here.
def field_creation():


    all_feilds=[
    'c',
    'c++'
    'java',
    'python',
    'html',
    'css',
    'js',
    'bootstrap',
    'sql',
    'dsa'
]

    for i in all_feilds:
        if not Topic.objects.filter(topic=i):
            Topic.objects.create(
                topic=i
            )
field_creation()