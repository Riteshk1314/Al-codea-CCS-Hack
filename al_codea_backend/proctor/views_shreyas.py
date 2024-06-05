from django.shortcuts import render,redirect
from .models import *

# Create your views here.

#admin
#admin

xyz="""1. What is the purpose of the `componentDidMount()` method in the context of React?
a) It is used to render a component
b) It is used to update a component
c) It is used to handle events
d) It is used to run code after a component is mounted to the DOM

Answer: d) It is used to run code after a component is mounted to the DOM

2. Which of the following is used to pass data from a parent component to a child component in React?
a) state
b) props
c) refs
d) keys

Answer: b) props

3. What is the role of the `key` prop in the following code snippet?
```php    
<tr key={index}>
  ...
</tr>
```
a) It is used to identify the row uniquely
b) It is used to style the row
c) It is used to handle events on the row
d) It is used to pass data to the row

Answer: a) It is used to identify the row uniquely

4. Which of the following is used to remove an item from an array in the `removeCharacter()` method?
a) filter()
b) map()
c) reduce()
d) forEach()

Answer: a) filter()

5. Which of the following is used to compile and create a production build of a React application?
a) npm run build
b) npm run compile
c) npm run production
d) npm run create-build

Answer: a) npm run build
"""

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
    return render(request,'index.html')


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
            
        question_creation(xyz,"dsa") #here in xyz ritesh will pass the string of questions from langchain
        
        return redirect('/')
    
    querryset=Topic.objects.all()
    
    context={
        'fields':querryset
    }
    
    return render(request, 'index.html', context)





