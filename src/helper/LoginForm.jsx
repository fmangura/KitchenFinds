import React, {useContext, useState} from 'react';
import useForm from './userForm'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import backend from '../api'
import Register from '../routes/RegisterForm';
import '../routes/auth.css'
import './LoginForm.css'

export default function LoginForm ({changeForm}) {
    const initialForm = {
        username: '',
        password: ''
    }
    const navigate = useNavigate();
    const {login, isLoggedIn, popError} = useContext(AuthContext)
    const {formData, handleChange, resetForm} = useForm(initialForm)

    if (isLoggedIn) return <Navigate to={'/'}/>

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            let res = await backend.login(formData)
            console.log(res)
            if (!res) throw Error ('Invalid user/password')
            resetForm
            login()
            navigate('/')
        } catch (err) {
            popError(err.message)
        }
    }

    return (
        <div className='form-container' >
            <div className='Authform'>
                <h1 style={{marginRight:'20px', fontSize:'xx-large', color:'#6A994E'}}>Hello,</h1>
                <p style={{fontSize:'xxx-large', marginTop:'0', marginBottom:'5px'}}>Welcome Back!</p>
                <form onSubmit={handleSubmit} className='login-form'>
                    <label htmlFor='username' className=''>Username: </label>
                    <input name='username' id='username' onChange={handleChange} value={formData.username}></input>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' id='password' onChange={handleChange} value={formData.password}></input>
                    <button>Login</button>
                </form>
                <a style={{alignSelf:'end'}} onClick={() => changeForm(<Register/>)}>new user?</a>
            </div>
        </div>
    );
}