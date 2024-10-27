from rest_framework import serializers
from .models import User, PadreEstudiante, EstudianteActividad, EstudianteProgresos, Flashcard, Actividad, Categoria

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'rol', 'email', 'password']
    
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = '__all__'
    
class EstudianteProgresosSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudianteProgresos
        fields = '__all__'

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'

class EstudianteActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudianteActividad
        fields = '__all__'

class PadreEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PadreEstudiante
        fields = '__all__'