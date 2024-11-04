const API_URL = 'http://127.0.0.1:8000/api/users/'

export async function fetchRegister(username, email, password, rol) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                rol
            })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error(`El error es: ${JSON.stringify(errorResponse)}`);
            // Lanza un nuevo error y asigna el contenido de errorResponse
            throw { ...errorResponse }; // Aquí lanzamos el objeto de error directamente
        }

        return await response.json();

    } catch (error) {
        throw new Error(error.message || 'Username o email ya existen');
    }
}