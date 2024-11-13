// src/components/Index.js
import React, { useState } from "react";
import "./Inicio.css";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Howl } from "howler";

const ITEMS_PER_PAGE = 6;
const BACKUP_AUDIO_URL = "https://www.example.com/audio/backup.mp3"; // URL de respaldo para el audio

const Inicio = () => {
  const [flashcards] = useState([
    {
      id: 1,
      word: "Dog",
      translation: "Perro",
      image:
        "https://th.bing.com/th/id/OIP.BK8STvfoGAkPFIe0cTCMxAHaFj?rs=1&pid=ImgDetMain",
      category: "Animales",
      createdAt: "2024-01-15",
      audio: "https://www.example.com/audio/dog.mp3", // Añade URL de audio
    },
    {
      id: 2,
      word: "Apple",
      translation: "Manzana",
      image:
        "https://th.bing.com/th/id/R.2ddbaf0733ce457559e39b01943abe9a?rik=QiSCHNJOcI1Ekg&pid=ImgRaw&r=0",
      category: "Frutas",
      createdAt: "2024-01-14",
      audio: "https://www.example.com/audio/dog.mp3", // Añade URL de audio
    },
    {
      id: 3,
      word: "Car",
      translation: "Carro",
      image:
        "https://th.bing.com/th/id/R.cae36dfe60de9f6e958a83a95b834396?rik=g%2b0GmXLllXq7XA&pid=ImgRaw&r=0&sres=1&sresct=1",
      category: "Vehículos",
      createdAt: "2024-01-13",
      audio: "https://www.example.com/audio/dog.mp3", // Añade URL de audio
    },
    {
      id: 4,
      word: "Orange",
      translation: "Naranja",
      image:
        "https://th.bing.com/th/id/OIP.q5lvfe6EYRtV7CAQeSu7LQHaF3?rs=1&pid=ImgDetMain",
      category: "Numeros",
      createdAt: "2024-01-12",
      audio: "https://www.example.com/audio/dog.mp3", // Añade URL de audio
    },
    {
      id: 5,
      word: "One",
      translation: "Uno",
      image:
        "https://png.pngtree.com/png-clipart/20230409/original/pngtree-golden-number-one-shiny-png-image_9039350.png",
      category: "Numeros",
      createdAt: "2024-01-12",
      audio: "https://www.example.com/audio/dog.mp3", // Añade URL de audio
    },
    {
      id: 6,
      word: "Two",
      translation: "Dos",
      image:
        "https://th.bing.com/th/id/OIP.fAucXt7S1p-X254Wze9UWwHaHa?rs=1&pid=ImgDetMain",
      category: "Numeros",
      createdAt: "2024-01-12",
      audio: "https://www.example.com/audio/dog.mp3", // Añade URL de audio
    },
    {
      id: 7,
      word: "Cow",
      translation: "Vaca",
      image:
        "https://i.pinimg.com/originals/7c/80/0d/7c800d5a278c21c51aa46408d1e4b743.jpg",
      category: "Animales",
      createdAt: "2024-01-12",
      audio: "https://www.example.com/audio/dog.mp3", // Añade URL de audio
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = flashcards.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const playTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Cambia el idioma si es necesario
      utterance.rate = 0.8; // Ajusta la velocidad a un valor más lento
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Tu navegador no soporta SpeechSynthesis");
    }
  };
  
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
              {currentItems.map((flashcard) => (
                <div key={flashcard.id} className="flashcard-created">
                  <div className="flashcard-image">
                    <img src={flashcard.image} alt={flashcard.word} />
                  </div>
                  <div className="flashcard-content">
                    <h4 className="flashcard-word">{flashcard.word}</h4>
                    <p className="flashcard-translation">
                      {flashcard.translation}
                    </p>
                    <span className="flashcard-category">
                      {flashcard.category}
                    </span>
                    <button
                      className="audio-button"
                      onClick={() => playTextToSpeech(flashcard.word)}
                    >
                      <VolumeUpIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles de Paginación */}
            {flashcards.length > ITEMS_PER_PAGE && (
              <div className="pagination-controls">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Anterior
                </button>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(flashcards.length / ITEMS_PER_PAGE)
                  }
                  className="pagination-button"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
