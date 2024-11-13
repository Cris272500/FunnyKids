import axios from 'axios';
import refreshAccessToken from './refreshAccessToken'

const API_FLASHCARDS_URL = "http://127.0.0.1:8000/api/flashcards/";

export async function fetchFlashCardsUser(refreshToken) {
    try {
        let token = localStorage.getItem('accessToken');
        let user = localStorage.getItem('user');
        let userId = JSON.parse(user).id;

        let response = await axios.get(API_FLASHCARDS_URL, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401 || response.status === 403) {
            console.log('Token expirado, intentamos refrescarlo...');
            const newToken = await refreshAccessToken(refreshToken);

            response = await axios.get(API_FLASHCARDS_URL, {
                headers: {
                    "Authorization": `Bearer ${newToken}`,
                    "Content-Type": "application/json"
                }
            });
        }

        const flashcards = response.data;
        const userFlashcards = flashcards.filter(flashcard => flashcard.creador === userId);

        return userFlashcards.length > 0 ? userFlashcards : [];

    } catch (error) {
        console.error("Error al obtener las flashcards:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : "Error de conexión");
    }
}