import React from "react";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <a className="navbar-brand title" href="#">Funny Kids</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <form className="form-inline mx-auto search-container">
                        <input type="search" className="form-control search-input" placeholder="Buscar flashcards..." />
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link navbar-link" href="#">Mis Flashcards</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbar-link" href="#">Categorías</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbar-link" href="#">Ayuda</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbar-link" href="#">Cerrar sesion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
