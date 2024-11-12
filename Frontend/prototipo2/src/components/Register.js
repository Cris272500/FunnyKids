import React, { useState } from 'react';
import { fetchRegister } from '../api/fetchRegister';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import './Authentication.css';

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [role, setRole] = useState('estudiante');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones
        let errorText = '';

        if (password.length < 6) {
            errorText += 'La contraseña debe tener al menos 6 caracteres. ';
        }

        if (password !== confirmation) {
            errorText += 'Las contraseñas no coinciden. ';
        }

        if (errorText) {
            setErrorMessage(errorText);
            return;
        }

        try {
            const data = await fetchRegister(username, email, password, role);

            if (data) {
                setErrorMessage('');
                // Realiza alguna acción después de un registro exitoso (como redirigir a otra página, por ejemplo)
                navigate('/');
            }
        } catch (error) {
            setErrorMessage('Hubo un problema al registrarte. Intenta nuevamente.');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form id="register-form" onSubmit={handleSubmit}>
                <div className="form-group-main">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-main">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="tucorreo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-main">
                    <label>Rol</label>
                    <select
                        id="rol"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="estudiante">Estudiante</option>
                        <option value="profesor">Profesor</option>
                        <option value="padre">Padre</option>
                    </select>
                </div>
                <div className="form-group-main">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-main">
                    <label htmlFor="confirmation">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmation"
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-btn">
                    Registrarse
                </button>
                {errorMessage && (
                    <p className="error-message" style={{ color: 'red' }}>
                        {errorMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Register;
