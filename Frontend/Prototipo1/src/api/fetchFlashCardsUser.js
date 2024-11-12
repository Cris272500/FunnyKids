const API_URL = "http://127.0.0.1:8000/api/flashcards/";

export async function fetchFlashCardsUser(refreshToken) {
    try {
        let token = localStorage.getItem('accessToken'); // Obtener el token de acceso desde localStorage
        let user = localStorage.getItem('user'); // Obtener el ID del usuario desde localStorage
        let userId = JSON.parse(user).id;
        // Intentamos hacer la solicitud con el token de acceso
        let response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Usamos el accessToken
            }
        });

        console.log(`Estado inicial: ${response.status}`);

        // Si el token ha expirado (estado 401 o 403), intentamos refrescarlo
        if (response.status === 401 || response.status === 403) {
            console.log('Token expirado, intentamos refrescarlo...');
            // Usamos el refreshToken para obtener un nuevo accessToken
            const newToken = await refreshAccessToken(refreshToken);

            // Reintentar la solicitud con el nuevo accessToken
            response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${newToken}`
                }
            });

            console.log(`Estado después de refrescar el token: ${response.status}`);
        }

        // Si la respuesta es exitosa (estado 200)
        if (response.ok) {
            const flashcards = await response.json();
            console.log("Flashcards obtenidas:", flashcards);

            // Filtrar las flashcards solo si el creador es el usuario autenticado
            const userFlashcards = flashcards.filter(flashcard => flashcard.creador === parseInt(userId));

            if (userFlashcards.length > 0) {
                console.log("Flashcards del usuario:", userFlashcards);
                return userFlashcards; // Retornamos las flashcards del usuario
            } else {
                console.log('El usuario no tiene flashcards.');
                return []; // Si no tiene flashcards, retornamos un arreglo vacío
            }
        } else {
            // Si la respuesta no es exitosa, mostramos el error
            const errorMessage = await response.json();
            console.error(`Error al obtener las flashcards: ${JSON.stringify(errorMessage)}`);
            throw new Error(errorMessage.detail);
        }

    } catch (error) {
        console.error("Error de conexión o al obtener las flashcards: ", error);
        throw new Error(error.detail || "Error de conexión");
    }
}
