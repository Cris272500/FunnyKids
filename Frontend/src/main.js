import Login from "./components/Login";
import Register from "./components/Register";

const app = document.querySelector('#app');

const loginComponent = new Login();
const registerComponent = new Register();

// mostramos el componente login por defecto
app.appendChild(loginComponent.getElement());

// aqui alternamos entre login y register
const toggleRegister = () => {
    app.innerHTML = ''; // limpiamos el contenedor
    app.appendChild(registerComponent.getElement());
}

const toggleLogin = () => {
    app.innerHTML = ''; // limpiamos el contenedor
    app.appendChild(loginComponent.getElement());
}

// botones toggle
const toggleButtons = document.createElement('div');
toggleButtons.innerHTML = `
  <button id="show-login">Mostrar Login</button>
  <button id="show-register">Mostrar Registro</button>
`;

app.prepend(toggleButtons);

toggleButtons.querySelector('#show-login').addEventListener('click', toggleLogin);
toggleButtons.querySelector('#show-register').addEventListener('click', toggleRegister);