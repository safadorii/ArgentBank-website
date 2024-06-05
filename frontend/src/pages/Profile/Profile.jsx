import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../../redux/actions/user.actions.jsx';
import User from '../../components/User.jsx';
import Account from '../../components/Account.jsx';
import AccountCardData from '../../data/Account.json';

/* Page de profil utilisateur */
function UserProfile() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    /* Fonction asynchrone qui récupère les données utilisateur et les met à jour avec useEffect */
    useEffect(() => {
        if (token) {
            const userData = async () => {
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
                        /* 
                            Vérification que la réponse de la requête est bien récupérée
                            console.log(data) 
                        */
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        }
                        /* Retourne les données utilisateur dans l'état Redux */
                        dispatch(userProfile(userData));
                    } else {
                        console.log("Erreur lors de la récupération du profil");
                    }
                } catch (error) {
                    console.error(error);
                };
            };
            userData();
        }
    }, [dispatch, token]);

    return (
        <div className='profile-page'>
            <main className='bg-dark'>
                {/* Retourne le composant utilisateur */}
                <User />
                {/* Retourne les éléments du fichier JSON avec map */}
                {AccountCardData.map((data) => (
                    /* Retourne le composant account */
                    <Account 
                        key={data.id}
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
        </div>
    )
}

export default UserProfile;
