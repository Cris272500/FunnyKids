// src/components/Register.js
import { fetchRegister } from "../api/fetchRegister";
//import './styles.css';

export default class Register {
    constructor(onSuccess) {
        this.container = document.createElement('div');
        this.container.classList.add('register');

        this.onSuccess = onSuccess;

        this.render();
    }

    render() {
        this.container.innerHTML = `
            <h2>Register</h2>
            <form id="register-form">
                <div class="form-group-main">
                    <label for="username">Nombre de Usuario</label>
                    <input type="text" id="username" placeholder="Nombre de usuario" required />
                </div>
                <div class="form-group-main">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" placeholder="tucorreo@ejemplo.com" required />
                </div>
                <div class="form-group-main">
                    <label>Rol</label>
                    <select id="rol">
                        <option value="estudiante">Estudiante</option>
                        <option value="profesor">Profesor</option>
                        <option value="padre">Padre</option>
                    </select>
                </div>
                <div class="form-group-main">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" required />
                </div>
                <div class="form-group-main">
                    <label for="confirmation">Confirmar Contraseña</label>
                    <input type="password" id="confirmation" required />
                </div>
                <button type="submit">Registrarse</button>
                <p id="register-error" class="error-message" style="display: none; color: red;"></p>
            </form>
        `;

        this.container.querySelector('#register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }

    async handleRegister() {
        const username = this.container.querySelector('#username').value;
        const email = this.container.querySelector('#email').value;
        const password = this.container.querySelector('#password').value;
        const role = this.container.querySelector('#rol').value;
        const confirmation = this.container.querySelector('#confirmation').value;
        const errorMessage = this.container.querySelector('#register-error');

        let errorText = '';

        if (password.length < 6) {
            errorText += 'La contraseña debe tener al menos 6 caracteres';
        }

        if (password !== confirmation) {
            errorText += 'Las contraseña no coinciden';
        }

        if (errorText) {
            errorMessage.innerText = errorText;
            errorMessage.style.display = 'block';
            return;
        }

        try {
            const data = await fetchRegister(username, email, password, role);

            if (data && data.tokens) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('accessToken', data.tokens.access);
                localStorage.setItem('refreshToken', data.tokens.refresh);
                errorMessage.style.display = 'none';
                Swal.fire({
                    title: '¡Registro exitoso!',
                    text: 'Tu cuenta ha sido creada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.onSuccess();
                    }
                })
            }
            console.log('Registration successful:', data);
            // Aquí puedes manejar el éxito, como redirigir al login
        } catch (error) {
            // Aquí ahora tomamos el error como un objeto
            let errorText = '';

            errorText = error.message;

            errorMessage.innerText = errorText; // Asigna el mensaje de error
            errorMessage.style.display = 'block'; // Muestra el párrafo
        }
    }

    getElement() {
        return this.container;
    }
}
