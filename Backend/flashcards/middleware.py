import time
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

class RefreshTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)
        print(f"Token: {token}")

        if token and token.startswith('Bearer '):
            try:
                token_str = token.split(' ')[1]
                decoded_token = AccessToken(token_str)
                exp_timestamp = decoded_token.payload['exp']
                current_timestamp = time.time()

                # Verificamos si el token está por expirar en menos de 60 segundos
                if exp_timestamp - current_timestamp < 60:
                    refresh_token = request.META.get('HTTP_REFRESH_TOKEN', None)  # Considera un refresh token separado
                    if refresh_token:
                        # Usamos el refresh token para generar un nuevo access token
                        refresh = RefreshToken(refresh_token)
                        new_access_token = str(refresh.access_token)
                        # Actualizamos la cabecera Authorization con el nuevo token de acceso
                        request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'

            except TokenError:
                # Si el token es inválido, eliminamos la cabecera de autorización
                print('Token is invalid or expired')
                request.META['HTTP_AUTHORIZATION'] = ''  # o None
