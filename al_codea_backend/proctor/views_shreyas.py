from django.shortcuts import render,redirect

# Create your views here.
def index(request):
    if request.method == 'POST':
        data=request.POST
        count=data.get('textarea_count')
        fields=[]
        for i in range(int(count)):
            fields.append(data.get(f'field{i+1}'))
        print(fields)
        return redirect('/')
    return render(request, 'index.html')