import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '../redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '../utils/regex.jsx';
import '../sass/components/_Form.scss';

function Form() {
    // Définition des états locaux pour les champs du formulaire et les messages d'erreur
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Fonction asynchrone du formulaire */
    const handleSubmit = async (event) => {
        event.preventDefault();
       // Vérification de la validité de l'e-mail et du mot de passe
        if (!isValidEmail(email)) {
            setErrorMessage("Adresse e-mail invalide");
            return;
        }
        if (!isValidPassword(password)) {
            setErrorMessage("Mot de passe invalide");
            return;
        }
        try {
            // Envoi d'une requête POST au serveur avec les données d'authentification
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
               // Traitement de la réponse
            if (response.ok) {
                const data = await response.json(); //Extraction des données JSON de la réponse
                const token = data.body.token;//Extraction du token d'authentification
                dispatch(loginSuccess(token));// Dispatch de l'action de connexion réussie avec le token
                sessionStorage.setItem("token", token);// Stockage du token dans sessionStorage
                if (rememberMe) {
                    localStorage.setItem("token", token);// Stockage du token dans localStorage si "Se souvenir de moi" est coché
                }
                navigate('/profile');// Redirection vers la page de profil
            } else {
                const error = "Email/Mot de passe incorrect"
                // Dispatch de l'action d'échec de connexion avec un message d'erreur
                dispatch(loginFailed(error));
                setErrorMessage(error);// Affichage du message d'erreur dans le formulaire

            }
        } catch (error) {
            console.error(error);
        }
    }
 // Rendu du composant
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
