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
from rest_framework import generics ,status
from .serializer import ProctorSerializer 
# from .serializer import  QuestionDeletionSerializer
from rest_framework.response import Response

# Create your views here.

#ritesh
#ritesh




def object_creation(question,options,answer,field):
    field=field
    question=question
    option1=options[0],
    option2=options[1],
    option3=options[2],
    option4='none of these',
    answer=answer
    if Topic.objects.filter(topic=field).exists():
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
    # print(data)
    for char in data:
        
        word += char
        if char == ' ':
            if word == 'Correct ' or word==  'Answer: ':
                # print("000")
                is_answer = True
            word = ''
        if char == '\n':
            if is_answer:
                # print(1)

                total_questions.append(question.strip())
                question = ''
                is_answer = False
            word = ''
        question += char


    print(question_creation)

    for i in total_questions:
        options=[]
        answer=''
        ques=''
        lines = i.split('\n')
        # print(lines)
        for line in lines:
            if line.startswith('   a)') or line.startswith('a)') or line.startswith('b)') or line.startswith('c)') or line.startswith('   b)') or line.startswith('   c)') :
                options.append(line.strip())
            elif line.startswith('   Correct') or line.startswith('Answer: '):
                # print(1)

                answer=line
            else:
                if not line.startswith('   Option' ) or line.startswith('Options'): 
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
        print(fields)
        xyz=str(ques_refined())
        print(xyz)
        question_creation(xyz,fields[0]) #here in xyz ritesh will pass the string of questions from langchain
        
        return redirect('/proctor/generate-question/')
    
    querryset=Topic.objects.all()
    
    context={
        'fields':querryset
    }
    
    return render(request, 'proctor/index.html', context)



# assistant: 1. Question: What is the output of the following code?
#    ```
#    def fibonacci(n):
#        if n <= 0:
#            return 0
#        elif n == 1:
#            return 1
#        else:
#            return fibonacci(n-1) + fibonacci(n-2)

#    print(fibonacci(10))
#    ```
#    Options:
#    a) 55
#    b) 34
#    c) 89

#    Correct Option: a

# 2. Question: Which of the following is the correct way to define a lambda function that takes two arguments and returns their sum?

#    Options:
#    a) lambda x, y: x + y
#    b) lambda (x, y): x + y
#    c) lambda x y: x + y

#    Correct Option: a

# 3. Question: What is the output of the following code?

#    ```
#    class A:
#        def __init__(self):
#            self.x = 1

#    class B(A):
#        def __init__(self):
#            super().__init__()
#            self.x = 2

#    class C(A):
#        def __init__(self):
#            super().__init__()
#            self.x = 3

#    b = B()
#    c = C()
#    print(B.x, C.x)
#    ```

#    Options:
#    a) 1 1
#    b) 2 3
#    c) 1 1

#    Correct Option: c

# 4. Question: Which of the following is the correct way to define a generator function that yields the first n Fibonacci numbers?

#    Options:
#    a) def fibonacci(n):
#            x, y = 0, 1
#            for _ in range(n):
#                yield x
#                x, y = y, x + y

#    b) def fibonacci(n):
#            x, y = 0, 1
#            for i in range(n):
#                yield x
#                x, y = y, x + y

#    c) def fibonacci(n):
#            x, y = 0, 1
#            for i in range(n):
#                yield (x, y)
#                x, y = y, x + y

#    Correct Option: b

# 5. Question: What is the output of the following code?

#    ```
#    def foo(x):
#        return x * 2

#    bar = lambda x: x * 3

#    print(foo(2) + bar(3))
#    ```

#    Options:
#    a) 12
#    b) 9
#    c) 6

#    Correct Option: a



class ReactView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = ProctorSerializer
    def get(self, request): #simply gets all the question in database or question of certain feild if provided in get request
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(field__topic=name)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):   # if a whole question is provided the creates that question as an object
        serializer = ProctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        delete_id = request.POST.get("delete_id") # if delete_id is provided then deletes that question from database in a post request as form data
        if not delete_id:
            return Response({"error": "delete_id not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = Question.objects.filter(id=delete_id)
        if queryset.exists():
            queryset.delete()
            return Response({"message": "Question deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        
        
# class QuestionDeletionView(generics.ListCreateAPIView):
#     queryset = Question.objects.all()
#     serializer_class = ProctorSerializer

#     def post(self, request):
#         delete_id = request.POST.get("delete_id")
#         if not delete_id:
#             return Response({"error": "delete_id not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
#         queryset = Question.objects.filter(id=delete_id)
#         if queryset.exists():
#             queryset.delete()
#             return Response({"message": "Question deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        