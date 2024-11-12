import axios from 'axios';

const REFRESH_URL = "http://127.0.0.1:8000/api/token/refresh/";

export async function refreshAccessToken(refreshToken) {
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