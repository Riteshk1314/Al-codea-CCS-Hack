from django.db import models

# Create your models here.
from django.db import models
import uuid

# class QuizQuestionpy(models.Model):
    
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     question_text = models.TextField()
#     option_a = models.TextField()
#     option_b = models.TextField()
#     option_c = models.TextField()
#     option_d = models.TextField()
#     correct_option = models.CharField(max_length=1, choices=[('A'),('B'),('C'),('D'),])
#     def __str__(self):
#         return self.question_text
    


from django.db import models

# Create your models here.
class topic(models.Model):
    feild=models.CharField(max_length=100)
    def __str__(self):
        return self.feild
    
class question(models.Model):
    topic=models.ForeignKey(topic,on_delete=models.CASCADE)
    question=models.CharField(max_length=1000)
    option1=models.CharField(max_length=1000)
    option2=models.CharField(max_length=1000)
    option3=models.CharField(max_length=1000)
    option4=models.CharField(max_length=1000)
    answer=models.CharField(max_length=1000)