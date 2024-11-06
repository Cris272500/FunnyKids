const API_URL = "http://127.0.0.1:8000/api/flashcards/";
import { refreshAccessToken } from "./refreshAccessToken";

export async function fetchCreateFlashcard(flashcard, refreshToken) {
    try {
        // Intentamos hacer la solicitud con el token de acceso actual
        let token = localStorage.getItem('accessToken'); // Obtener el token de acceso desde localStorage
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Usamos el accessToken
            },
            body: JSON.stringify(flashcard)
        });

        // Si el token ha expirado (status 401 o 403), intentamos refrescarlo
        if (response.status === 401 || response.status === 403) {
            console.log('Token expirado, intentamos refrescarlo...');
            // Usamos el refreshToken para obtener un nuevo accessToken
            const newToken = await refreshAccessToken(refreshToken);
            // Reintentar la solicitud con el nuevo accessToken
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${newToken}`
                },
                body: JSON.stringify(flashcard)
            });
        }

        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Error al crear la flashcard: ${JSON.stringify(errorMessage)}`);
            throw new Error(errorMessage.message);
        }

        return await response.json();
    } catch (error) {
        console.error("Error de conexión o al crear la flashcard: ", error);
        throw new Error(error.message || "Error de conexión");
    }
}
