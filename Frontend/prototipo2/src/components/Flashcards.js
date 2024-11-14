import { React, useState } from "react";
import "./Flashcards.css";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Flashcards = () => {
  const [flipped, setFlipped] = useState({});
  const [progress, setProgress] = useState(65);

  const flashcards = [
    {
      word: "Apple",
      translation: "Manzana",
      image:
        "https://th.bing.com/th/id/R.a72115694d8a0f3c972a9b04a64c0159?rik=evxq17aMz4CI1Q&pid=ImgRaw&r=0",
      audio: "example-audio.mp3",
    },
    {
      word: "Dog",
      translation: "Perro",
      image:
        "https://th.bing.com/th/id/R.5b71dcb3fa7795f74bebe4c1bf664b9e?rik=8GRLEa%2fvlw4JMA&pid=ImgRaw&r=0",
      audio: "example-audio.mp3",
    },
  ];

  const playTextToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Cambia el idioma si es necesario
      utterance.rate = 0.8; // Ajusta la velocidad a un valor más lento
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Tu navegador no soporta SpeechSynthesis");
    }
  };

  const toggleFlip = (index) => {
    setFlipped((prevFlipped) => ({
      ...prevFlipped,
      [index]: !prevFlipped[index],
    }));
  };

  return (
    <div>
      <div className="progress-container">
        <div className="progress-header">
          <span className="level-text">Nivel 1</span>
          <span className="progress-text">{progress}% Completado</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-inner"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard Section */}
      <div className="flashcard-section">
        {flashcards.map((flashcard, index) => (
          <div key={index} className="flashcard-container">
            <div
              className={`flashcard ${flipped[index] ? "flipped" : ""}`}
              onClick={() => toggleFlip(index)} // Pasamos el índice de la tarjeta
            >
              {/* Front of card */}
              <div className="flashcard-front">
                <img
                  src={flashcard.image}
                  alt={flashcard.word}
                  style={{ width: "100%", height: "60%" }}
                />
                <h3>{flashcard.word}</h3>
                <button
                 onClick={(e) => {
                  e.stopPropagation();
                  playTextToSpeech(flashcard.word);
                 }}
                 >
                  <VolumeUpIcon />
                </button>
              </div>
              {/* Back of card */}
              <div className="flashcard-back">
                <h3>{flashcard.translation}</h3>
                <p>Haz click para voltear</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="button-container">
        <button onClick={() => setProgress(progress - 5)}>Repasar</button>
        <button onClick={() => setProgress(progress + 5)}>Siguiente</button>
      </div>
    </div>
  );
};

export default Flashcards;
