import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { fetchLogin } from "../api/fetchLogin";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchLogin(username, password);

      if (data) {
        // Guarda el token de acceso y los datos del usuario en localStorage
        setErrorMessage("");
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(
        "Hubo un problema al iniciar sesión. Intenta nuevamente."
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group-main">
          <label for="username-login">Nombre de Usuario</label>
          <input
            type="text"
            id="username-login"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group-main">
          <label for="password-login">Contraseña</label>
          <input
            type="password"
            id="password-login"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Iniciar Sesión
        </button>

        {errorMessage && (
          <p
            id="login-error"
            className="error-message"
            style={{ color: "red" }}
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
