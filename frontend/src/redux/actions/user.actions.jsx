import { GET_USERPROFILE, EDIT_USERNAME } from "./type.actions";


/* Action de récupération des données utilisateur */
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,// Données utilisateur à transmettre
    }
}

/* Action de mise à jour du nom d'utilisateur */
export const updateUsername = (username) => {
    return {
        type: EDIT_USERNAME,
        payload: username,// Nouveau nom d'utilisateur à transmettre
    }
}