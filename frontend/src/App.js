import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Header from './components/Header.jsx';
import Profile from './pages/Profile/Profile.jsx';
import './sass/_Main.scss';

export default function App () {
    
    return (
        <div>
           <Header /> 
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='profile' element={<Profile />} />
            </Routes>
        <Footer/>    
        </div>
    )  
}
