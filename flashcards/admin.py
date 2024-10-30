from django.contrib import admin
from .models import CustomUser, Flashcard, EstudianteProgresos, Actividad, EstudianteActividad, PadreEstudiante

# Register your models here.
admin.site.register(CustomUser)