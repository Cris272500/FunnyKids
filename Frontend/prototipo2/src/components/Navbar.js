import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
    const navigate = useNavigate();
    // obteniendo objeto user del local storage
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        // Limpiamos el Local Storage
        // Limpiar localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Redirigir a la página de autenticación
        navigate("/autenticacion");
    }

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
                            <NavLink to="/flashcards" className={({ isActive }) => isActive ? "nav-link navbar-link active" : "nav-link navbar-link"}>
                                Repaso
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <span onClick={handleLogout} className="nav-link navbar-link" style={{ cursor: 'pointer' }}>
                                Cerrar sesión
                            </span>
                        </li>

                        <li className="nav-item profile-item">
                            <div className="profile-container">
                                <PersonIcon className="profile-icon" />
                                <div className="username">{user.username}</div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
