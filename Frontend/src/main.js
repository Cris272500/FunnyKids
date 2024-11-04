import Login from "./components/Login";
import Register from "./components/Register";
import Index from "./components/Index";
import "./components/styles.css";

const app = document.getElementById("app");

export function redirectToIndex() {
  const indexComponent = new Index();
  app.innerHTML = '';
  app.classList.remove('container');
  app.appendChild(indexComponent.getElement());
}

export function renderAuthView() {
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

  const formContainer = document.querySelector('#form-container');
  const loginButton = document.getElementById('show-login');
  const registerButton = document.getElementById('show-register');
  
  const loginComponent = new Login(redirectToIndex);
  const registerComponent = new Register(redirectToIndex);
  
  function showLoginForm() {
    formContainer.innerHTML = ''; 
    formContainer.appendChild(loginComponent.getElement());
    loginButton.classList.add('active');
    registerButton.classList.remove('active');
  }
  
  function showRegisterForm() {
    formContainer.innerHTML = ''; 
    formContainer.appendChild(registerComponent.getElement());
    registerButton.classList.add('active');
    loginButton.classList.remove('active');
  }
  
  showLoginForm();
  
  loginButton.addEventListener('click', showLoginForm);
  registerButton.addEventListener('click', showRegisterForm);
}

// Verifica si debe mostrar la vista de autenticación
if (localStorage.getItem("showAuthView") === "true") {
  localStorage.removeItem("showAuthView"); // Limpia la señal
  renderAuthView();
} else {
  redirectToIndex();
}
