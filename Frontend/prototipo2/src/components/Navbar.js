import React from "react";
import { NavLink } from "react-router-dom";
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
                            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link navbar-link active" : "nav-link navbar-link"}>
                                Mis flashcards
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/categorias" className={({ isActive }) => isActive ? "nav-link navbar-link active" : "nav-link navbar-link"}>
                                Categorías
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/ayuda" className={({ isActive }) => isActive ? "nav-link navbar-link active" : "nav-link navbar-link"}>
                                Ayuda
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/autenticacion" className={({ isActive }) => isActive ? "nav-link navbar-link active" : "nav-link navbar-link"}>
                                Cerrar sesión
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
