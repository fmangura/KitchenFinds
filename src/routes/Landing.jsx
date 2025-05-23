import React, {useContext, useEffect, useState} from 'react';
import useForm from '../helper/userForm'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import backend from '../api'
import './Landing.css'

import LandingPhotos from '../helper/LandingPhotos'
import Register from './RegisterForm';
import LoginForm from '../helper/LoginForm';

export default function Landing () {
    const navigate = useNavigate();
    const {login, isLoggedIn} = useContext(AuthContext)
    const [openForm, setOpenForm] = useState()
    const changeForm = (component) => {
        setOpenForm(openForm => component)
    }
    useEffect(() => {
        const initialForm = () => {
            setOpenForm(<div className='left-layout'>
                <h1>Leftover</h1>
                <h1>recipes</h1>
                <h1>re-imagined</h1>
                <span className='login-buttons'>
                    <button onClick={() => changeForm(<LoginForm changeForm={changeForm}/>)}>Login</button>
                </span>
                <a onClick={() => changeForm(<Register/>)}>new user?</a>
            </div>)
        }
        initialForm()
    },[])

    if (isLoggedIn) return <Navigate to={'/'}/>

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            let res = await backend.login(formData)
            if (!res) throw Error ('Invalid user/password')
            resetForm
            login()
            navigate('/')
        } catch (err) {
            setErrMsg(err.message)
        }
    }

    return (
        <div className='layout' >
            {openForm}
            <LandingPhotos/>
        </div>
    );
}