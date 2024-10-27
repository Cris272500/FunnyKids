from rest_framework import serializers
from .models import User, PadreEstudiante, EstudianteActividad, EstudianteProgresos, Flashcard, Actividad, Categoria

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'rol', 'email', 'password']
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            
            if user:
                if not user.is_active:
                    raise serializers.ValidationError('Esta cuenta esta inactiva')
                return user
            else:
                raise serializers.ValidationError('Credenciales invalidas')
        else:
            raise serializers.ValidationError('Faltan credenciales')
    
    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    
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