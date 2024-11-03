// src/components/Register.js
import { fetchRegister } from "../api/fetchRegister";

export default class Register {
    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('register');

        this.render();
    }

    render() {
        this.container.innerHTML = `
            <h2>Register</h2>
            <form id="register-form">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <label for="role">Rol:</label>
                <select id="role" name="role" required>
                    <option value="">Seleccione un rol</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                    <option value="padre">Padre</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p id="register-error" style="color: red;"></p>
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
        const role = this.container.querySelector('#role').value;

        try {
            const data = await fetchRegister(username, email, password, role);
            console.log('Registration successful:', data);
            // Aquí puedes manejar el éxito, como redirigir al login
        } catch (error) {
            this.container.querySelector('#register-error').innerText = error.message;
        }
    }

    getElement() {
        return this.container;
    }
}
