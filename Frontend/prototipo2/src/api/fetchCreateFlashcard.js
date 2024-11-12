import axios from 'axios';

export async function fetchCreateFlashcard(flashcard, refreshToken) {
    try {
        let token = localStorage.getItem('accessToken');
        let response = await axios.post(API_FLASHCARDS_URL, flashcard, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401 || response.status === 403) {
            console.log('Token expirado, intentamos refrescarlo...');
            const newToken = await refreshAccessToken(refreshToken);

            response = await axios.post(API_FLASHCARDS_URL, flashcard, {
                headers: {
                    "Authorization": `Bearer ${newToken}`,
                    "Content-Type": "application/json"
                }
            });
        }

        return response.data;
    } catch (error) {
        console.error("Error al crear la flashcard:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : "Error de conexión");
    }
}