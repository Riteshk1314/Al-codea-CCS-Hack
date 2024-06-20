from django.urls import path
from proctor.views import *

urlpatterns = [
    path('generate-question/', index, name='ques_proc'),
    path('reactview/', ReactView.as_view(), name='ReactView'),
    # path('questiondeletion/', QuestionDeletionView.as_view(), name='QuestionDeletionView'),
    
]

