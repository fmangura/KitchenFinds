import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './components/AuthProvider'
import Home from './routes/Home'
import Landing from './routes/Landing'
import RegisterForm from './routes/RegisterForm'
import Nav from './components/Nav';
import ErrorCard from './components/ErrorCard';
import Profile from './routes/Profile';

export default function App () {

    return (
        <>
            <BrowserRouter>
                <Auth>
                    <Nav />
                    <ErrorCard />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/login' element={<Landing />} />
                        <Route path='/register' element={<RegisterForm />} />
                    </Routes>
                </Auth>
            </BrowserRouter>
        </>
    );
}