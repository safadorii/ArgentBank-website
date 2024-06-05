import { GET_USERPROFILE, EDIT_USERNAME, LOGOUT } from "../actions/type.actions"


/* État initial de l'utilisateur */
const initialState = {
    status: 'VOID',
    userData: {}
}

export const userReducer = (state = initialState, action ) => {
    switch (action.type) {
        // Cas de récupération du profil utilisateur
        case GET_USERPROFILE:
            return {
                ...state,
                status: 'SUCCEEDED',
                userData: action.payload
            }
            // Cas de modification du nom d'utilisateur
        case EDIT_USERNAME: 
            return {
                ...state,
                status: "MODIFIED",
                userData: {
                    ...state.userData,
                    username: action.payload
                } 
            } 
             // Cas de déconnexion
        case LOGOUT: {
            return initialState;  
        }   
        default:
            return state;    
    }
}

        