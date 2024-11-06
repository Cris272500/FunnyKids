// Index.js

import './index.css'
import { fetchCategorias } from '../api/fetchCategorias';
import { fetchCreateFlashcard } from '../api/fetchCreateFlashcard';

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
                                    <!-- Campo para la palabra -->
                                    <div class="form-group">
                                        <label for="palabra">Palabra</label>
                                        <input type="text" id="palabra" placeholder="Escribe la palabra aquí" class="input" required>
                                    </div>

                                    <!-- Campo para la traducción -->
                                    <div class="form-group">
                                        <label for="traduccion">Traducción</label>
                                        <input type="text" id="traduccion" placeholder="Escribe la traducción aquí" class="input" required>
                                    </div>

                                    <!-- Campo para la URL de la imagen -->
                                    <div class="form-group">
                                        <label for="imagen_url">URL de la Imagen</label>
                                        <input type="url" id="imagen_url" placeholder="Ingresa la URL de la imagen" class="input" required>
                                    </div>

                                    <!-- Campo para la URL del audio (opcional) -->
                                    <div class="form-group">
                                        <label for="audio_url">URL del Audio</label>
                                        <input type="url" id="audio_url" placeholder="Ingresa la URL del audio (opcional)" class="input">
                                    </div>

                                    <!-- Campo para la categoría (select) -->
                                    <div class="form-group">
                                        <label for="categoria">Categoría</label>
                                        <select id="categoria" class="select" required>
                                            <option value="">Selecciona una categoría</option>
                                            <!-- Las opciones de categorías se deben poblar dinámicamente -->
                                        </select>
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

            // Aqui obtenemos las categorias disponibles
            this.loadCategories(element.querySelector('#categoria'));
            
            // Evento para el botón de cerrar sesión
            element.querySelector('#logout-button').addEventListener('click', () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                localStorage.setItem("showAuthView", "true"); // Establece la señal
                window.location.reload(); // Recarga la página
            });

            // Evento para el botón de crear flashcard
            element.querySelector('#flashcardForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleCreateFlashcard();
            });
    
            return element;
            
        } catch (error) {

            // En caso que no tenga los tokens
            localStorage.setItem("showAuthView", "true"); // Establece la señal
            window.location.reload(); // Recarga la página
        }


    }

    async loadCategories(selectElement) {
        try {
            const categories = await fetchCategorias();

            if (selectElement) {
                categories.forEach((category) => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.nombre;
                    selectElement.appendChild(option);
                });
            }
        } catch (error) {
            console.error(`Error al cargar las categorías: ${error}`);
        }
    }

    async handleCreateFlashcard() {
        const palabra = document.getElementById('palabra').value;
        const traduccion = document.getElementById('traduccion').value;
        const imagen_url = document.getElementById('imagen_url').value;
        const audio_url = document.getElementById('audio_url').value;
        const categoria = document.getElementById('categoria').value;

        // obtenemos el token
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(`RefreshToken: ${refreshToken}`);
        //console.log(`AccesToken: ${accessToken}`);

        if (!refreshToken) {
            // mostramos una alerta con sweetalert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes iniciar sesión para crear flashcards',
            });
            return;
        }

        const flashcardData = {
            palabra,
            traduccion,
            imagen_url,
            audio_url:audio_url ? audio_url : null,
            categoria,
        };

        // llamada al endpoint
        try {
            const response = await fetchCreateFlashcard(flashcardData, refreshToken);

            if (response) {
                // mostramos una alerta con sweetalert
                Swal.fire({
                    icon: 'success',
                    title: 'Flashcard creado con exito',
                    text: 'Tu flashcard ha sido creado exitosamente',
                });
                // limpiamos los campos
                document.getElementById('palabra').value = '';
                document.getElementById('traduccion').value = '';
                document.getElementById('imagen_url').value = '';
                document.getElementById('audio_url').value = '';
                document.getElementById('categoria').value = '';
            } else {
                // mostrando el problema / error al crear la flashcard
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.message,
                });
            }
        } catch (error) {
            console.error(`Error al crear la flashcard: ${error}`);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear la flashcard',
            })
        }
    }

}
