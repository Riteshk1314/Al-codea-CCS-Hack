from django.shortcuts import render,redirect
from .models import *

# Create your views here.

#admin
#admin


all_feilds=[
    'c',
    'java',
    'python',
    'django',
    'flask',
    'html',
    'css',
    'js',
    'jquery',
    'bootstrap',
    'react',
    'angular',
    'node',
    'express',
    'mongodb',
    'sql',
    'mysql',
    'dbms',
    'nosql',
    'data science',
    'machine learning',
    'deep learning',
    'artificial intelligence',
    'dsa'
]

def field_creation(request):
    for i in all_feilds:
        if not topic.objects.filter(topic=i):
            topic.objects.create(
                topic=i
            )
    return render(request,'index.html')

def question_creation(request):
    field="python"
    question='1. What is the purpose of the `componentDidMount()` method in the context of React?',
    option1='It is used to render a component',
    option2='It is used to update a component',
    option3='It is used to handle events',
    option4='It is used to run code after a component is mounted to the DOM',
    answer=option4
    if not question.objects.filter(feild=topic.objects.get(feild=field),question=question):
        question.objects.create(
            topic=topic.objects.get(feild=field),
            question=question,
            option1=option1,
            option2=option2,
            option3=option3,
            option4=option4,
            answer=answer
        )
    return render(request,'index.html')



def index(request):
    fields=[]
    question=[]
    answer=[]
    if request.method == 'POST':
        data=request.POST
        count=data.get('textarea_count')
        for i in range(int(count)):
            fields.append(data.get(f'topic{i}'))
        
        
        
        return redirect('/')
    
    
    querryset=topic.objects.all()
    
    context={
        'fields':querryset
    }
    
    return render(request, 'index.html', context)





