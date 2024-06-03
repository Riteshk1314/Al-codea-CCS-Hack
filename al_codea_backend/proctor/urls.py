from django.urls import path
from . import views

urlpatterns = [
    path('generate-question/', views.ques_proc, name='ques_proc'),
]
