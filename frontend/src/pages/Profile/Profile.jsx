// components/UserProfile.jsx
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

    /* Utilisation de useEffect pour récupérer les données utilisateur */
    useEffect(() => {
        if (token) {
            dispatch(userProfile(token));
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
