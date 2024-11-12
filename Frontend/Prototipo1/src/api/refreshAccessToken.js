const REFRESH_URL = "http://127.0.0.1:8000/api/token/refresh/";

export async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch(REFRESH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ refresh: refreshToken })
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el token de acceso");
        }

        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        return data.access;
    } catch (error) {
        throw new Error(error.message || "Error de conexion");
    }
}