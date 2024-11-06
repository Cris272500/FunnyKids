from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, FlashcardViewSet, EstudianteProgresosViewSet, ActividadViewSet, EstudianteActividadViewSet, PadreEstudianteViewSet, LoginView, CategoriaViewSet, CustomTokenRefreshView

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'flashcards', FlashcardViewSet)
router.register(r'progresos', EstudianteProgresosViewSet)
router.register(r'actividades', ActividadViewSet)
router.register(r'estudiante-actividad', EstudianteActividadViewSet)
router.register(r'padre-estudiante', PadreEstudianteViewSet)
router.register(r'categorias', CategoriaViewSet)

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]
