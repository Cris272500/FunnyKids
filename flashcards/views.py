from django.shortcuts import render, HttpResponse

# Create your views here.
def hola(request):
    return HttpResponse("hola")