import { fetchLogin } from "../api/fetchLogin";
//import './styles.css';

export default class Login {
    constructor(onSuccess) {
        this.container = document.createElement('div');
        this.container.classList.add('login');

        this.onSuccess = onSuccess;

        this.render();
    }

    render() {
        this.container.innerHTML = `
            <h2>Login</h2>
            
            <form id="login-form">
                <div class="form-group">
                    <label for="username-login">Nombre de Usuario</label>
                    <input type="text" id="username-login" placeholder="Nombre de usuario" required />
                </div>
                <div class="form-group">
                    <label for="password-login">Contraseña</label>
                    <input type="password" id="password-login" required />
                </div>
                <button type="submit">Iniciar sesión</button>
                <p id="login-error" class="error-message" style="display: none; color: red;"></p>
            </form>
        `;

        this.container.querySelector('#login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    async handleLogin() {
        const username = this.container.querySelector('#username-login').value;
        const password = this.container.querySelector('#password-login').value;
        const errorMessage = this.container.querySelector('#login-error');

        try {
            const data = await fetchLogin(username, password);
            console.log(`Login exitoso: ${data}`);
            // usando stringify
            console.log(`Data: ${JSON.stringify(data)}`);

            // si todo ocurrio exitoso, mostramos una alerta de inicio de sesion con sweetalert
            if (data && data.tokens) {
                errorMessage.style.display = 'none';
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('accessToken', data.tokens.access);
                localStorage.setItem('refreshToken', data.tokens.refresh);
                Swal.fire({
                    title: '¡Inicio de sesión exitoso!',
                    text: 'Has iniciado sesión correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Aquí puedes agregar la lógica de redirección o envío de datos
                      this.onSuccess();
                    }
                });
            } else {
                errorMessage.style.display = 'block';
                errorMessage.innerText = data.message;
            }
        } catch (error) {
            errorMessage.style.display = 'block';
            errorMessage.innerText = error.message;
        }
    }

    getElement() {
        return this.container;
    }
}