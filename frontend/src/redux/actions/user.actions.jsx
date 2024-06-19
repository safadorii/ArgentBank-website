// actions/user.actions.jsx
import { GET_USERPROFILE, EDIT_USERNAME } from "./type.actions";

/* Action de récupération des données utilisateur avec logique de récupération intégrée */
export const userProfile = (token) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userData = {
                    createdAt: data.body.createdAt,
                    updatedAt: data.body.updatedAt,
                    id: data.body.id,
                    email: data.body.email,
                    firstname: data.body.firstName,
                    lastname: data.body.lastName,
                    username: data.body.userName
                };

                dispatch({
                    type: GET_USERPROFILE,
                    payload: userData, // Données utilisateur à transmettre
                });
            } else {
                console.error("Erreur lors de la récupération du profil");
            }
        } catch (error) {
            console.error(error);
        }
    }
};

/* Action de mise à jour du nom d'utilisateur avec logique de soumission intégrée */
export const updateUsername = (username, token) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userName: username }),
            });

            if (response.ok) {
                const data = await response.json();
                const updatedUsername = data.body.userName; // Récupération du nouveau nom d'utilisateur depuis la réponse

                dispatch({
                    type: EDIT_USERNAME,
                    payload: updatedUsername, // Nouveau nom d'utilisateur à transmettre
                });
            } else {
                console.error("Champs invalides");
            }
        } catch (error) {
            console.error(error);
        }
    }
};
