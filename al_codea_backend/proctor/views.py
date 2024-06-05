from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.llms import Ollama #using an open source model 
from langchain_core.prompts import ChatPromptTemplate
import bs4
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS

from django.shortcuts import render
from .RAG import ques_maker
from django.shortcuts import render,redirect
from .models import *
from .ggroq import ques_refined
# Create your views here.

#admin
#admin



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

def field_creation(request):
    for i in all_feilds:
        if not Topic.objects.filter(topic=i):
            Topic.objects.create(
                topic=i
            )
    return render(request,'proctor/index.html')


def object_creation(question,options,answer,field):
    field=field
    question=question
    option1=options[0],
    option2=options[1],
    option3=options[2],
    option4=options[3],
    answer=answer
    
    if not Question.objects.filter(field=Topic.objects.get(topic=field),question=question).exists():
        Question.objects.create(
            field=Topic.objects.get(topic=field),
            question=question,
            option1=option1,
            option2=option2,
            option3=option3,
            option4=option4,
            answer=answer
        )




def question_creation(prompt,field):
    field=field
    data=prompt
    total_questions = [] 
    question = ''
    word = ''
    is_answer = False

    for char in data:
        word += char
        if char == ' ':
            if word == 'Answer: ':
                is_answer = True
                word = ''
        if char == '\n':
            if is_answer:
                total_questions.append(question.strip())
                question = ''
                is_answer = False
            word = ''
        question += char
        
        
        

    for i in total_questions:
        options=[]
        answer=''
        ques=''
        lines = i.split('\n')
        
        for line in lines:
            if line.startswith('a)') or line.startswith('b)') or line.startswith('c)') or line.startswith('d)'):
                options.append(line.strip())
            elif line.startswith('Answer:'):
                answer=line
            else:
                ques+=line
                ques+='\n'
        question=ques
        # print(question)
        # for b in options:
        #     print(b)
        # print(answer)
    
        object_creation(question,options,answer,field)
        
   
    
    
   



def index(request):
    fields=[]
    if request.method == 'POST':
        data=request.POST
        count=data.get('textarea_count')
        
        for i in range(int(count)):
            fields.append(data.get(f'field{i+1}'))
            
        xyz=ques_refined()
            
        question_creation(xyz,"dsa") #here in xyz ritesh will pass the string of questions from langchain
        
        return redirect('/')
    
    querryset=Topic.objects.all()
    
    context={
        'fields':querryset
    }
    
    return render(request, 'proctor/index.html', context)






