from rest_framework import serializers
from .models import Question,Topic
class ProctorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields='__all__'