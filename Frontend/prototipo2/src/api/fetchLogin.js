import axios from 'axios';
import Swal from 'sweetalert2'; // Mover esta importación aquí

const API_LOGIN_URL = "http://127.0.0.1:8000/api/login/";

export async function fetchLogin(username, password) {
    try {
        const response = await axios.post(API_LOGIN_URL, {
            username,
            password
        });

        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenido a la plataforma!',
        });

        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response.data;
    } catch (error) {
        console.error("Error de login:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : "Error de conexión");
    }
}