from django.shortcuts import render,redirect

# Create your views here.
def index(request):
    fields=[]
    if request.method == 'POST':
        data=request.POST
        count=data.get('textarea_count')
        for i in range(int(count)):
            fields.append(data.get(f'field{i+1}'))
        print(fields)
        context={
        'field':fields,
        }
        return render(request, 'index.html', context)
        
    
    return render(request, 'index.html', {'field': fields})