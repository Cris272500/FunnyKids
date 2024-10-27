from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .models import User, PadreEstudiante, EstudianteActividad, EstudianteProgresos, Flashcard, Actividad, Categoria
from .serializers import UserSerializer, PadreEstudianteSerializer, EstudianteActividadSerializer, EstudianteProgresosSerializer, FlashcardSerializer, ActividadSerializer, CategoriaSerializer

# Create your views here.
def hola(request):
    return HttpResponse("hola")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer

class EstudianteProgresosViewSet(viewsets.ModelViewSet):
    queryset = EstudianteProgresos.objects.all()
    serializer_class = EstudianteProgresosSerializer

class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer

class EstudianteActividadViewSet(viewsets.ModelViewSet):
    queryset = EstudianteActividad.objects.all()
    serializer_class = EstudianteActividadSerializer

class PadreEstudianteViewSet(viewsets.ModelViewSet):
    queryset = PadreEstudiante.objects.all()
    serializer_class = PadreEstudianteSerializer