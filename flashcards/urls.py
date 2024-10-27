from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, FlashcardViewSet, EstudianteProgresosViewSet, ActividadViewSet, EstudianteActividadViewSet, PadreEstudianteViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'flashcards', FlashcardViewSet)
router.register(r'progresos', EstudianteProgresosViewSet)
router.register(r'actividades', ActividadViewSet)
router.register(r'estudiante_actividades', EstudianteActividadViewSet)
router.register(r'padre_estudiantes', PadreEstudianteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
