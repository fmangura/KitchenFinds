import React, {useContext, useState} from 'react';
import useForm from '../helper/userForm'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import backend from '../api'
import './auth.css'
import Logo from '../assets/KitchenLarge.svg'

export default function Register () {
    const initialForm = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: ''
    }
    const navigate = useNavigate();
    const {formData, handleChange, resetForm} = useForm(initialForm)
    const [errMsg, setErrMsg] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await backend.register(formData)
        resetForm
        navigate('/login')
    }

    const {username, password, first_name, last_name, email} = formData

    const canSave = [username, password, first_name, last_name, email].every(Boolean)
    return (
        <div className='authDiv'>
            <div className='card card--accent Authcard'>
                <div className='Authform'>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username' className=''>Username: </label>
                        <input name='username' placeholder='username' id='username' onChange={handleChange} value={username}></input>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' placeholder='password' id='password' onChange={handleChange} value={password}></input>
                        <label htmlFor='first_name'>First Name: </label>
                        <input name='first_name' placeholder='First Name' id='first_name' onChange={handleChange} value={first_name}></input>
                        <label htmlFor='last_name'>Last Name: </label>
                        <input name='last_name' placeholder='Last Name' id='last_name' onChange={handleChange} value={last_name}></input>
                        <label htmlFor='email'>Email: </label>
                        <input name='email' placeholder='email' id='email' onChange={handleChange} value={email}></input>
                        <button className='cookButton' disabled={!canSave}>Complete</button>
                    </form>
                </div>
                <div className='fillerImg'>
                    <img src={Logo} alt="" />
                </div>
            </div>
            {errMsg ? errMsg : null}
        </div>
    );
}