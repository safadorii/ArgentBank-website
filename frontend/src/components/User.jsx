import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../redux/actions/user.actions.jsx';
import { isValidName } from "../utils/regex.jsx";
import '../sass/components/_User.scss';

function User() {
    /* Met à jour les données de l'utilisateur sur la page de profil depuis l'état Redux */
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
    /* Gère l'affichage du formulaire de modification du nom d'utilisateur */
    const [display, setDisplay] = useState(true);
    /* Récupère le nom d'utilisateur */
    const [userName, setUserName] = useState('');
    /* Gère le message d'erreur */
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    /* Fonction asynchrone de mise à jour du nom d'utilisateur */
    const handleSubmitUsername = async (event) => {
        event.preventDefault();
        if (!isValidName(userName)) {
            setErrorMessage("Nom d'utilisateur invalide");
            return;
        } else {
            setErrorMessage("");
        }
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userName }),
            });
            if (response.ok) {
                const data = await response.json();
                const username = data.body.userName;
                /* 
                    Vérification que la réponse de la requête est bien récupérée
                    console.log(data) 
                */
                dispatch(updateUsername(username));
                setDisplay(!display);
            } else {
                console.log("Champs invalides")
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="header">
            {display ? 
                <div>
                    <h2>Welcome back 
                        <br />
                        {userData.firstname} {userData.lastname} !
                    </h2>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">Nom d'utilisateur :</label>
                            <input
                                type="text"
                                id="username"
                                defaultValue={userData.username}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">Prénom :</label>
                            <input
                                type="text"
                                id="firstname" 
                                defaultValue={userData.firstname}
                                disabled={true}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Nom :</label>
                            <input
                                type="text"
                                id="lastname" 
                                defaultValue={userData.lastname}
                                disabled={true}
                            />
                        </div>
                        <div className="buttons">
                            <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default User;

