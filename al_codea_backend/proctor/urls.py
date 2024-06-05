from django.urls import path
from . import views

urlpatterns = [
    path('generate-question/', views.index, name='ques_proc'),
]
