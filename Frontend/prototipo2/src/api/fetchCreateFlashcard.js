import axios from 'axios';
import refreshAccessToken from './refreshAccessToken';

const API_URL = "http://127.0.0.1:8000/api/flashcards/";

export async function fetchCreateFlashcard(flashcard, refreshToken) {
    try {
        let token = localStorage.getItem('accessToken');
        let response = await axios.post(API_URL, flashcard, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.log('Token expirado, intentamos refrescarlo...');

            // Verifica si el refreshToken está disponible
            if (!refreshToken) {
                throw new Error("No se encontró el refresh token. Por favor, inicia sesión nuevamente.");
            }

            const newToken = await refreshAccessToken(refreshToken);

            try {
                const response = await axios.post(API_URL, flashcard, {
                    headers: {
                        "Authorization": `Bearer ${newToken}`,
                        "Content-Type": "application/json"
                    }
                });
                return response.data;
            } catch (retryError) {
                console.error("Error al crear la flashcard después de refrescar el token:", retryError.response ? retryError.response.data : retryError.message);
                throw new Error(retryError.response ? retryError.response.data : "Error de conexión después de refrescar el token");
            }
        } else {
            console.error("Error al crear la flashcard:", error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data : "Error de conexión");
        }
    }
}
