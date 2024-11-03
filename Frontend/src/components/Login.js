import { fetchLogin } from "../api/fetchLogin";

export default class Login {
    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('login');

        this.render();
    }

    render() {
        this.container.innerHTML = `
            <h2>Login</h2>
            
            <form id="login-form">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                <button type="submit">Login</button>
            </form>

            <p id="login-error" style="color: red;"></p>
        `;

        this.container.querySelector('#login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    async handleLogin() {
        const username = this.container.querySelector('#username').value;
        const password = this.container.querySelector('#password').value;

        try {
            const data = await fetchLogin(username, password);
            console.log(`Login exitoso: ${data}`);
            // usando stringify
            console.log(`Data: ${JSON.stringify(data)}`);
        } catch (error) {
            this.container.querySelector('#login-error').innerText = error.message;
        }
    }

    getElement() {
        return this.container;
    }
}