# from django.db import models
# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.db import models
# # Create your models here.
# class CustomUser(AbstractUser):
#     username = None
#     email = models.EmailField(_('email address'), unique=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     objects = CustomUserManager()


# Assuming this is your student/models.py file

from django.db import models

class Frame(models.Model):
    frame = models.ImageField(upload_to='frames/')  # Adjust the upload path as needed

    def __str__(self):
        return self.frame.name  # Return the filename as a string representation
