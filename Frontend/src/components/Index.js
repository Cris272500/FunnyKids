// Index.js

export default class Index {
    getElement() {
        const element = document.createElement('div');
        element.classList.add('index-container');

        element.innerHTML = `
            <nav class="navbar">
                <h1>Bienvenido a Funny Kids</h1>
                <button id="logout-button" class="logout-button">Cerrar sesión</button>
            </nav>
            <div class="welcome-message">
                <h2>¡Bienvenido, Prof.Cris2725!</h2>
                <p>Explora las opciones en el menú de navegación.</p>
            </div>
        `;

        // Evento para el botón de cerrar sesión
        element.querySelector('#logout-button').addEventListener('click', () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem("showAuthView", "true"); // Establece la señal
            window.location.reload(); // Recarga la página
        });

        return element;
    }
}
