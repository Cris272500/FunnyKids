import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import './Authentication.css';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);

    const showLogin = () => setIsLogin(true);
    const showRegister = () => setIsLogin(false);

    return (
        <div className="container-main">
            <div className="card-main">
                <h1>Funny Kids</h1>
                <p id="form-title">Crear una nueva cuenta o iniciar sesión</p>
                <div className="button-group">
                    <button id="show-login" className="button login-btn" onClick={showLogin} disabled={isLogin}>Iniciar sesión</button>
                    <button id="show-register" className="button register-btn" onClick={showRegister} disabled={!isLogin}>Registrarse</button>
                </div>
                <div id="form-container" className="form-container">
                    {isLogin ? <Login /> : <Register />}
                </div>
            </div>
            
        </div>
    )
}

export default Authentication