import React from 'react';
import './Authentication.css';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>

            <form id='login-form'>
                <div className='form-group-main'>
                    <label for='username-login'>Nombre de Usuario</label>
                    <input type='text' id='username-login' placeholder='Nombre de usuario' required />
                </div>
                <div className='form-group-main'>
                    <label for='password-login'>Contraseña</label>
                    <input type='password' id='password-login' required />
                </div>
                <button type='submit' className='login-btn'>Iniciar Sesión</button>
                <p id='login-error' className='error-message' style={{ display: 'none', color: 'red' }}></p>
            </form>

        </div>
    )
}

export default Login