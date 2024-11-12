import axios from 'axios';
import Swal from 'sweetalert2'; // Mover esta importación aquí

const API_URL = 'http://127.0.0.1:8000/api/users/';

export async function fetchRegister(username, email, password, rol) {
    try {
        const response = await axios.post(API_URL, {
            username,
            email,
            password,
            rol
        });

        // Alerta de éxito
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Bienvenido a la plataforma!',
        });

        // Guarda el token de acceso y los datos del usuario en localStorage
        localStorage.setItem('accessToken', response.data.access); // Asume que el token está en 'access'
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Guarda los datos del usuario
  
        return response.data;
    } catch (error) {
        console.error("Error en el registro:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : "Username o email ya existen");
    }
}
