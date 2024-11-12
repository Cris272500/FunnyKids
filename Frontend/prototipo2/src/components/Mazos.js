import React from "react";
import { Link } from "react-router-dom";
import { Search, Book, Star, Users } from "lucide-react";
import './Mazos.css'

const Mazos = () => {
    const decks = [
        { id:1, name: "Animales", totalCards: 20, progress: 75 ,image: "https://th.bing.com/th/id/OIP.JVOc6hTxqhZlZRE0An2GsAHaGC?rs=1&pid=ImgDetMain" },
        { id:2, name: "Colores", totalCards: 15, progress: 90 ,image: "https://th.bing.com/th/id/R.b22045453cb980aec7627cdd4240f4d9?rik=3EI%2bkRzRjRNpuQ&riu=http%3a%2f%2fimg.clipartlook.com%2fcolours-clipart--1920.jpg&ehk=wiA%2boH%2br79PEfzstAIQ4zQF3kt7vgqTyfLH7Uz%2fG%2b1U%3d&risl=&pid=ImgRaw&r=0" },
        { id:3, name: "Números",  totalCards: 30, progress: 50,image: "https://th.bing.com/th/id/OIP.woFC5tZjQjEkjgKvgZShzwAAAA?rs=1&pid=ImgDetMain" },
        { id:4,name: "Frutas", totalCards: 25, progress: 60 ,image: "https://th.bing.com/th/id/OIP.HTuk1VktKbBEPLSyFJIvSgHaFZ?rs=1&pid=ImgDetMain" },
      ];      
    return (
        <div>
            <main className="main-content">
                <h1 className="main-title">Mis Mazos de Flashcards</h1>

                <div className="decks-container">
                {decks.map((deck) => (
                    <Link key={deck.id} to={`/deck/${deck.id}`} className="deck-link">
                    <div className="deck-card">
                        <div className="deck-header">
                        <div className="deck-image">
                            <img src={deck.image} alt={deck.name} />
                        </div>
                        <div className="deck-info">
                            <p className="deck-cards">{deck.totalCards} tarjetas</p>
                            <div className="deck-rating">
                            <Star className="star-icon" />
                            <span className="deck-rating-text">{Math.floor(deck.progress / 20)}</span>
                            </div>
                        </div>
                        </div>
                        <h2 className="deck-name">{deck.name}</h2>
                        <progress className="deck-progress" value={deck.progress} max="100" />
                        <div className="deck-footer">
                        <span className="deck-progress-text">{deck.progress}% completado</span>
                        <div className="deck-users">
                            <Users className="user-icon" />
                            <span className="user-count">2,5k</span>
                        </div>
                        </div>
                        <div className="deck-footer-gradient" />
                    </div>
                    </Link>
                ))}
                </div>

                {/* Create New Deck Button */}
                <div className="create-deck-btn">
                <button className="btn-create">
                    <Book className="book-icon" />
                    Crear Nuevo Mazo
                </button>
                </div>
            </main>
        </div>
    )
}

export default Mazos;