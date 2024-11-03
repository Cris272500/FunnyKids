from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .models import CustomUser, PadreEstudiante, EstudianteActividad, EstudianteProgresos, Flashcard, Actividad, Categoria
from .serializers import CustomUserSerializer, LoginSerializer ,PadreEstudianteSerializer, EstudianteActividadSerializer, EstudianteProgresosSerializer, FlashcardSerializer, ActividadSerializer, CategoriaSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

class LoginView(APIView):
    permission_classes = [AllowAny] # esto es para permitir ver sin autenticar
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
    permission_classes = [AllowAny] # esto es para permitir ver sin autenticar
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_data = serializer.save()
        tokens = serializer.get_tokens(user_data)

        return Response({
            "user": CustomUserSerializer(user_data, context=self.get_serializer_context()).data,
            "tokens": tokens
        }, status=status.HTTP_201_CREATED)

class FlashcardViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny] # esto es para permitir ver sin autenticar
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer

    def perform_create(self, serializer):
        # verificamos si no esta autenticado
        if not self.request.user.is_authenticated:
            raise PermissionDenied("Debe estar autenticado para crear flashcards")
        # si no es un profesor
        if self.request.user.rol != 'profesor':
            raise PermissionDenied("Solo profesores pueden crear flashcards")
        
        # si es un profesor se guarda
        serializer.save(creador=self.request.user)

class CategoriaViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny] # esto es para permitir ver sin autenticar
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

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