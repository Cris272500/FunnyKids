// Index.js

export default class Index {
    getElement() {

        try {

            const element = document.createElement('div');
            element.classList.add('index-container');
            
            // obteniendo usuario
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(`Usuario actual: ${user.username}`);

            element.innerHTML = `
                <nav class="navbar">
                    <h1>Bienvenido a Funny Kids</h1>
                    <button id="logout-button" class="logout-button">Cerrar sesión</button>
                </nav>
                <div class="welcome-message">
                    <h2>¡Bienvenido, ${user.username}!</h2>
                    <p>Tu rol es: ${user.rol}.</p>
                    <p>Explora las opciones en el menú de navegación.</p>
                </div>
            `;
            // Evento para el botón de cerrar sesión
            element.querySelector('#logout-button').addEventListener('click', () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                localStorage.setItem("showAuthView", "true"); // Establece la señal
                window.location.reload(); // Recarga la página
            });
    
            return element;
        } catch (error) {

            // En caso que no tenga los tokens
            localStorage.setItem("showAuthView", "true"); // Establece la señal
            window.location.reload(); // Recarga la página
        }

    }
}
