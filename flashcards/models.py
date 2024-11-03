from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    ROLES = [
        ('estudiante', 'estudiante'),
        ('profesor', 'profesor'),
        ('padre', 'padre'),
    ]

    rol = models.CharField(max_length=20, choices=ROLES)
    def __str__(self):
        return f"{self.username} || {self.rol}"

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    imagen_url = models.URLField()

    def __str__(self):
        return self.nombre

class Flashcard(models.Model):
    palabra = models.CharField(max_length=300)
    traduccion = models.CharField(max_length=300)
    imagen_url = models.URLField()
    audio_url = models.URLField(null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    creador = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.palabra} || {self.traduccion}"

class EstudianteProgresos(models.Model):
    ESTADOS_CHOICES = [
        ('pendiente', 'pendiente'),
        ('completado', 'completado'),
    ]

    estudiante = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='progreso', limit_choices_to={'rol': 'estudiante'})
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE, related_name='progreso')
    estado = models.CharField(max_length=20, choices=ESTADOS_CHOICES)
    intentos = models.IntegerField(default=0)
    ultima_vez = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.estudiante} || {self.flashcard} || {self.ultima_vez}"

class Actividad(models.Model):
    ACTIVIDAD_TIPOS = [
        ('juego', 'juego'),
        ('prueba', 'prueba'),
    ]
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE, related_name='actividad')
    tipo = models.CharField(max_length=20, choices=ACTIVIDAD_TIPOS)
    descripcion = models.TextField()

    def __str__(self):
        return f"{self.flashcard} || {self.tipo}"

class EstudianteActividad(models.Model):
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='estudiante_actividad')
    estudiante = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='estudiante_actividad', limit_choices_to={'rol': 'estudiante'})
    score = models.IntegerField(default=0)
    completado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.actividad} || {self.estudiante.CustomUsername} || {self.score}"

class PadreEstudiante(models.Model):
    padre = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='hijos', limit_choices_to={'rol': 'padre'})
    estudiante = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='padre', limit_choices_to={'rol': 'estudiante'})

    def __str__(self):
        return f"{self.padre.CustomUsername} || {self.estudiante.CustomUsername}"