
from django.urls import path
from student.views import *

urlpatterns = [
    # path('activate/<uidb64>/<token>', activate, name='activate'),
    # path('student/', register, name='activate'),
    path('camera/', CameraFrameView.as_view(), name='camera'),
    path('index/', views.home, name='camera'),
    
]
