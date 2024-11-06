// Index.js

import './index.css'

export default class Index {
    getElement() {

        try {

            const element = document.createElement('div');
            element.classList.add('index-container');
            
            // obteniendo usuario
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(`Usuario actual: ${user.username}`);

            element.innerHTML = `
                <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                    <div class="container">
                        <a class="navbar-brand title" href="#">Funny Kids</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                        <form class="form-inline mx-auto search-container">
                            <input type="search" class="form-control search-input" placeholder="Buscar flashcards...">
                        </form>
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link navbar-link" href="#">Mis Flashcards</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link navbar-link" href="#">Categorías</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link navbar-link" href="#">Crear Flashcard</a>
                            </li>
                            <li class="nav-item">
                                <a id="logout-button" class="nav-link navbar-link btn-dark text-white" href="#">Cerrar sesión</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>

                
                <div class="container">
                    <div class="grid">
                        <div class="card create-card">
                            <div class="card-header">
                                <h2 class="card-title">Crear Nueva Flashcard</h2>
                            </div>

                            <div class="card-content">
                                <form id="flashcardForm" class="form">
                                    <div class="form-group">
                                        <label for="question">Pregunta</label>
                                        <textarea id="question" placeholder="Escribe tu pregunta aquí" class="textarea"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="answer">Respuesta</label>
                                        <textarea id="answer" placeholder="Escribe la respuesta aquí" class="textarea"></textarea>
                                    </div>
                                    <button type="submit" class="submit-button">
                                        <svg class="icon plus-icon"></svg>
                                        Crear Flashcard
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div class="flashcards-preview">
                            <h3 class="preview-title">Flashcards Creadas</h3>
                            <div id="flashcardsContainer" class="flashcards-container"></div>
                        </div>
                    </div>
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
        finally {
            
        }


    }
}
