import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './components/AuthProvider'
import Home from './routes/Home'
import LoginForm from './routes/LoginForm'
import RegisterForm from './routes/RegisterForm'
import Nav from './components/Nav';
import Profile from './routes/Profile'

export default function App () {

    return (
        <>
            <BrowserRouter>
                <Auth>
                    <Nav />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/register' element={<RegisterForm />} />
                    </Routes>
                </Auth>
            </BrowserRouter>
        </>
    );
}