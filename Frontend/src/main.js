import Login from "./components/Login";
import Register from "./components/Register";
import "./components/styles.css";

// Selecciona el contenedor principal
const app = document.getElementById("app");

// Crea la estructura de la tarjeta de autenticación
app.innerHTML = `
  <div class="container">
    <div class="card">
      <h1>Funny Kids</h1>
      <p id="form-title">Crear una nueva cuenta o iniciar sesión</p>
      <div class="button-group">
        <button id="show-login" class="button login-btn">Iniciar sesión</button>
        <button id="show-register" class="button register-btn">Registrarse</button>
      </div>
      <div id="form-container" class="form-container"></div>
    </div>
  </div>
`;

// Selección de elementos para manejar los eventos y el contenido
const formContainer = document.querySelector('#form-container');
const loginButton = document.getElementById('show-login');
const registerButton = document.getElementById('show-register');

// Instancia de los componentes de Login y Register
const loginComponent = new Login();
const registerComponent = new Register();

// Función para mostrar el formulario de login
function showLoginForm() {
  formContainer.innerHTML = ''; // Limpiar contenedor
  formContainer.appendChild(loginComponent.getElement());
  loginButton.classList.add('active');
  registerButton.classList.remove('active');
}

// Función para mostrar el formulario de registro
function showRegisterForm() {
  formContainer.innerHTML = ''; // Limpiar contenedor
  formContainer.appendChild(registerComponent.getElement());
  registerButton.classList.add('active');
  loginButton.classList.remove('active');
}

// Mostrar el formulario de login al cargar la página
showLoginForm();

// Asignar eventos a los botones para alternar entre formularios
loginButton.addEventListener('click', showLoginForm);
registerButton.addEventListener('click', showRegisterForm);
