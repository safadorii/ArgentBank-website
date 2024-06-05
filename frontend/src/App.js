import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login/Login.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Header from './components/Header.jsx';
import Profile from './pages/Profile/Profile.jsx';
import './sass/_Main.scss';

export default function App () {
    // Récupère l'état de connexion de l'utilisateur à partir de Redux
        const isConnected = useSelector((state) => state.auth.isConnected);
    
    return (
        <div>
           <Header /> 
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
               < Route 
                    path='profile' 
                    element={isConnected ? <Profile /> : <Navigate to="/login" />} 
                />
            </Routes>
        <Footer/>    
        </div>
    )  
}
