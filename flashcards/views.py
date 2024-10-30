from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .models import CustomUser, PadreEstudiante, EstudianteActividad, EstudianteProgresos, Flashcard, Actividad, Categoria
from .serializers import CustomUserSerializer, LoginSerializer ,PadreEstudianteSerializer, EstudianteActividadSerializer, EstudianteProgresosSerializer, FlashcardSerializer, ActividadSerializer, CategoriaSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            tokens = serializer.get_tokens(user)

            return Response({
                'tokens': tokens,
                'user': CustomUserSerializer(user).data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
def hola(request):
    return HttpResponse("hola")

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

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