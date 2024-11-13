import axios from 'axios';

const REFRESH_URL = "http://127.0.0.1:8000/api/token/refresh/";

export default async function refreshAccessToken(refreshToken) {
    if (!refreshToken) {
        throw new Error("El refresh token no está disponible.");
    }

    try {
        const response = await axios.post(REFRESH_URL, { refresh: refreshToken });
        const newToken = response.data.access;
        localStorage.setItem("accessToken", newToken);
        return newToken;
    } catch (error) {
        console.error("Error al actualizar el token:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : "Error de conexión");
    }
}
