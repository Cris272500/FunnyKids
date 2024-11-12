// src/components/Index.js
import React, {useState} from "react";
import Navbar from "./Navbar";
import './Inicio.css';

const Inicio = () => {

  const [flashcards] = useState([
    {
      id: 1,
      word: "Dog",
      translation: "Perro",
      image: "https://th.bing.com/th/id/OIP.BK8STvfoGAkPFIe0cTCMxAHaFj?rs=1&pid=ImgDetMain",
      category: "Animales",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      word: "Apple",
      translation: "Manzana",
      image: "https://th.bing.com/th/id/R.2ddbaf0733ce457559e39b01943abe9a?rik=QiSCHNJOcI1Ekg&pid=ImgRaw&r=0",
      category: "Frutas",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      word: "Car",
      translation: "Carro",
      image: "https://th.bing.com/th/id/R.cae36dfe60de9f6e958a83a95b834396?rik=g%2b0GmXLllXq7XA&pid=ImgRaw&r=0&sres=1&sresct=1",
      category: "Vehículos",
      createdAt: "2024-01-13",
    },
    {
      id: 4,
      word: "Red",
      translation: "Rojo",
      image: "https://th.bing.com/th/id/R.fea8427d187ceab90115eed8e01b5fb6?rik=%2fWUd9nu3yUEpIg&riu=http%3a%2f%2fclipartmag.com%2fimages%2fred-clipart-8.png&ehk=%2fBgBaah5pO0fN%2bRwLfrwhgpDFjEJkIP9OAqtIhyDiu0%3d&risl=&pid=ImgRaw&r=0",
      category: "Colores",
      createdAt: "2024-01-12",
    },
  ]);

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

          {/* Flashcards creadas */}
          <div className="flashcards-preview">
            <h3 className="preview-title">Flashcards Creadas</h3>
            <div className="flashcards-container" id="flashcardsContainer">
              {flashcards.map((flashcard) => (
                <div key={flashcard.id} className="flashcard-created">
                  <div className="flashcard-image">
                    <img src={flashcard.image} alt={flashcard.word} />
                  </div>
                  <div className="flashcard-content">
                    <h4 className="flashcard-word">{flashcard.word}</h4>
                    <p className="flashcard-translation">{flashcard.translation}</p>
                    <span className="flashcard-category">{flashcard.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
