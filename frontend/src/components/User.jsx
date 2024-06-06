import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../redux/actions/user.actions.jsx';
import { isValidName } from "../utils/regex.jsx";
import '../sass/components/_User.scss';

function User() {
  
    const token = useSelector((state) => state.auth.token); // Récupération du token d'authentification
    const userData = useSelector((state) => state.user.userData); // Récupération des données utilisateur
    // Gestion de l'affichage du formulaire de modification du nom d'utilisateur
    const [display, setDisplay] = useState(true);// État pour afficher ou masquer le formulaire

    const [userName, setUserName] = useState('');// État pour stocker le nouveau nom d'utilisateur
   
    const [errorMessage, setErrorMessage] = useState('');// État pour stocker les messages d'erreur

    const dispatch = useDispatch();

    // Fonction asynchrone pour gérer la soumission du formulaire de modification du nom d'utilisateur
    
    const handleSubmitUsername = async (event) => {
        event.preventDefault();
         // Validation du nouveau nom d'utilisateur
        if (!isValidName(userName)) // Vérification si le nom d'utilisateur est valide
        {
            setErrorMessage("Nom d'utilisateur invalide");
            return;
        } else {
            setErrorMessage("");
        }
        try { // Envoi d'une requête PUT au serveur pour mettre à jour le nom d'utilisateur
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
                const username = data.body.userName;// Récupération du nouveau nom d'utilisateur depuis la réponse
              
                dispatch(updateUsername(username));// Dispatch de l'action pour mettre à jour le nom d'utilisateur dans l'état Redux
                setDisplay(!display); // Changement de l'affichage du formulaire après la mise à jour réussie
                
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

