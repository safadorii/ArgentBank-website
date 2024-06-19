// actions/auth.actions.jsx
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./type.actions";

/* Actions d'authentification */
export const loginSuccess = (email, password, rememberMe) => {
    return async (dispatch) => {
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
                const token = data.body.token;
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: token,
                });
                sessionStorage.setItem("token", token);
                if (rememberMe) {
                    localStorage.setItem("token", token);
                }
            } else {
                const error = "Email/Mot de passe incorrect";
                dispatch({
                    type: LOGIN_FAIL,
                    payload: error,
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: LOGIN_FAIL,
                payload: "Erreur de connexion",
            });
        }
    };
};

export const loginFailed = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}
