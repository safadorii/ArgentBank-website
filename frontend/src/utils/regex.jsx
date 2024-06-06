export const isValidName = (name) => {
    const regex = /^[a-zA-Z]+(?:[-']?[a-zA-Z]+)*$/;
    return regex.test(name);
};


export const isValidEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
};

export const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/; 
    return regex.test(password);
};
//Ces fonctions peuvent être utilisées pour garantir que les données saisies
// par l'utilisateur dans un formulaire respectent les critères spécifiés 
//avant d'être soumises ou enregistrées dans l'application.





