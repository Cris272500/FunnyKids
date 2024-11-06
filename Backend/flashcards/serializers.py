from rest_framework import serializers
from .models import CustomUser, PadreEstudiante, EstudianteActividad, EstudianteProgresos, Flashcard, Actividad, Categoria

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'rol', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Evita que la contraseña se muestre en las respuestas

    def create(self, validated_data):
        # validamos que si el usuario exista lance un error
        username = validated_data.get('username')
        email = validated_data.get('email')

        if CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError({'message': 'El usuario ya existe'})
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({'message': 'El email ya existe'})


        password = validated_data.pop('password', None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)  # Encripta la contraseña
        user.save()

        return user
    
    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        print(f"CustomUser: {username} || password: {password}")

        if username and password:
            user = authenticate(username=username, password=password)
            print(f"Usuario: {user}")

            if user is None:
                # verificamos si el usuario existe en la bd
                if CustomUser.objects.filter(username=username).exists():
                    raise serializers.ValidationError({
                        'message': 'La contraseña es incorrecta.'
                    })
                else:
                    raise serializers.ValidationError({
                        'message': 'El usuario no existe.'
                    })
            
            if not user.is_active:
                raise serializers.ValidationError({
                    'message': 'El usuario no esta activo.'
                })
            
            
            return user
        
        else:
            raise serializers.ValidationError('Faltan credenciales')
        
        
    
    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
    
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class FlashcardSerializer(serializers.ModelSerializer):
    audio_url = serializers.URLField(allow_null=True, required=False, default=None)
    class Meta:
        model = Flashcard
        fields = ['id', 'palabra', 'traduccion', 'imagen_url', 'audio_url', 'categoria', 'fecha_creacion', 'creador']
        read_only_fields = ['fecha_creacion', 'creador']
    
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