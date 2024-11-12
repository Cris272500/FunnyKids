import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css';
import PersonIcon from '@mui/icons-material/Person';

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
                            <NavLink to="/mazos" className={({ isActive }) => isActive ? "nav-link navbar-link active" : "nav-link navbar-link"}>
                                Mazos
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

                        <li className="nav-item profile-item">
                            <div className="profile-container">
                                <PersonIcon className="profile-icon" />
                                <div className="username">Cristopher Quintana</div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
