// components/Form.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '../utils/regex.jsx';
import '../sass/components/_Form.scss';

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidEmail(email)) {
            setErrorMessage("Adresse e-mail invalide");
            return;
        }

        if (!isValidPassword(password)) {
            setErrorMessage("Mot de passe invalide");
            return;
        }

        try {
            await dispatch(loginSuccess(email, password, rememberMe));
            navigate('/profile');
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <section className='sign-in-content'>
            <i className="fa-solid fa-circle-user"></i>
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='username'>Nom d'utilisateur</label>
                    <input 
                        id='username' 
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input 
                        id='password' 
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='input-remember'>
                    <input 
                        id='remember-me' 
                        type='checkbox' 
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <label htmlFor='remember-me'>Se souvenir de moi</label>
                </div>
                <button className="sign-in-button">
                    Se connecter
                </button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
        </section>
    )
}

export default Form;
