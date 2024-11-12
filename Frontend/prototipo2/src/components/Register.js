import React from 'react';
import './Authentication.css';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <form id='register-form'>
                <div className='form-group-main'>
                    <label for='username'>Nombre de Usuario</label>
                    <input type='text' id='username' placeholder='Nombre de usuario' required />
                </div>
                <div className='form-group-main'>
                    <label for='email'>Correo Electronico</label>
                    <input type='email' id='email' placeholder='tucorreo@ejemplo.com' required />
                </div>
                <div className='form-group-main'>
                    <label>Rol</label>
                    <select id='rol'>
                        <option value='estudiante'>Estudiante</option>
                        <option value='profesor'>Profesor</option>
                        <option value='padre'>Padre</option>
                    </select>
                </div>
                <div className='form-group-main'>
                    <label for='password'>Contraseña</label>
                    <input type='password' id='password' required />
                </div>
                <div className='form-group-main'>
                    <label for='confirmation'>Confirmar Contraseña</label>
                    <input type='password' id='confirmation' required />
                </div>
                <button type='submit'>Registrarse</button>
                <p id='register-error' className='error-message' style={{ display: 'none', color: 'red' }}></p>
            </form>
        </div>
    );
}

export default Register