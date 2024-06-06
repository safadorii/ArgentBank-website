import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/argentBankLogo.webp';
import { logout } from '../redux/actions/auth.actions';
import '../sass/components/_Header.scss';

function Header() {
    // Récupération des données utilisateur à partir de l'état Redux
    const isConnected = useSelector((state) => state.auth.token); // Vérifie si l'utilisateur est connecté en récupérant le token d'authentification
    const firstname = useSelector((state) => state.user.userData.firstname);// Récupère le prénom de l'utilisateur à partir des données utilisateur

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Fonction de déconnexion de l'utilisateur
    const logoutHandler = () => {
        dispatch(logout());// Dispatch de l'action logout pour déconnecter l'utilisateur
        sessionStorage.clear();// Suppression du token d'authentification stocké dans sessionStorage
        localStorage.clear();// Suppression du token d'authentification stocké dans localStorage
        navigate('/');// Redirection vers la page d'accueil
    }
    return (
        <header>
            <h1 className='sr-only'>Argent Bank</h1>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Logo de la banque" />
                </Link> 
                {isConnected ? (
                    <div className='connected'>
                        <Link to='/profile'>
                            <i className='fa-solid fa-2x fa-circle-user' />
                            <p>{firstname}</p>
                        </Link>
                        <Link to='/' onClick={logoutHandler}>
                            <i className='fa-solid fa-arrow-right-from-bracket' />
                            <p> Sign out  </p>
                        </Link>
                    </div>
                ) : (
                    <div className='not-connected'>
                        <Link to='/login' >
                            <i className="fa-solid fa-circle-user"></i>
                            <p>Sign In </p>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    ) 
}

export default Header;
