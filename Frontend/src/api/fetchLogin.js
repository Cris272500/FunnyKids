const API_URL = "http://127.0.0.1:8000/api/login/";

export async function fetchLogin(username, password) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.detail || "Error al iniciar sesión");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Error de conexion");
    }
}