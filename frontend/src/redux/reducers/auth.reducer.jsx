import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/type.actions";

/* État initial de l'authentification */
const initialState = {
    status: "VOID",
    isConnected: false,
    token: null,
    error: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Cas de succès de la connexion
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: "SUCCEEDED",
                isConnected: true,
                token: action.payload,
                error: null
            }
        // Cas d'échec de la connexion
        case LOGIN_FAIL: {
            return {
                ...state,
                status: "FAILED",
                isConnected: false,
                error: action.payload
            }
        }  
          // Cas de déconnexion
        case LOGOUT: {
            return initialState;
        }  
         // Par défaut, retourne l'état actuel
        default:
            return state;
    }
}