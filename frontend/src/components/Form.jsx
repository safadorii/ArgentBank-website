import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '../redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '../utils/regex.jsx';
import '../sass/components/_Form.scss';

function Form() {
    /* Permet de récupérer les données saisies par l'utilisateur dans le formulaire */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    /* Indique un message d'erreur si les données sont invalides */
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Fonction asynchrone du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault();
        /* Gère le message d'erreur */
        if (!isValidEmail(email)) {
            setErrorMessage("Adresse e-mail invalide");
            return;
        }
        if (!isValidPassword(password)) {
            setErrorMessage("Mot de passe invalide");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                /* 
                    Vérification que la réponse de la requête est bien récupérée
                    console.log(data) 
                */
                const token = data.body.token;
                dispatch(loginSuccess(token));
                sessionStorage.setItem("token", token);
                if (rememberMe) {
                    localStorage.setItem("token", token);
                }
                navigate('/profile');
            } else {
                const error = "Email/Mot de passe incorrect"
                dispatch(loginFailed(error));
                setErrorMessage(error);
            }
        } catch (error) {
            console.error(error);
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
