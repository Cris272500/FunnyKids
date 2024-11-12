// src/components/Index.js
import React from "react";
import Navbar from "./Navbar";
import './Inicio.css';

const Inicio = () => {
  return (
    <div>
      {/* Puedes agregar más contenido aquí */}

      <div class="container">
        <div class="grid">
          <div class="card create-card">
            <div class="card-header">
              <h2 class="card-title">Crear Nueva Flashcard</h2>
            </div>

            <div class="card-content">
              <form id="flashcardForm" class="form">
                <div class="form-group">
                  <label for="palabra">Palabra</label>
                  <input
                    type="text"
                    id="palabra"
                    placeholder="Escribe la palabra aquí"
                    class="input"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="traduccion">Traducción</label>
                  <input
                    type="text"
                    id="traduccion"
                    placeholder="Escribe la traducción aquí"
                    class="input"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="imagen_url">URL de la Imagen</label>
                  <input
                    type="url"
                    id="imagen_url"
                    placeholder="Ingresa la URL de la imagen"
                    class="input"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="audio_url">URL del Audio</label>
                  <input
                    type="url"
                    id="audio_url"
                    placeholder="Ingresa la URL del audio (opcional)"
                    class="input"
                  />
                </div>

                <div class="form-group">
                  <label for="categoria">Categoría</label>
                  <select id="categoria" class="select" required>
                    <option value="">Selecciona una categoría</option>
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
    </div>
  );
};

export default Inicio;
