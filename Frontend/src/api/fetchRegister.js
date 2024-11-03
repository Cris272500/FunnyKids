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
            const errorMessage = await response.json();
            throw new Error(errorMessage.detail || 'Error al registrar el usuario');
        }

        return await response.json();

    } catch (error) {
        throw new Error(error.message || 'Error de conexión');
    }
}