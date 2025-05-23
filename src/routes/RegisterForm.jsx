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
    const {popError} = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await backend.register(formData)
            resetForm
            navigate('/login')
        } catch (err) {
            popError(err.message)
        }
    }

    const {username, password, first_name, last_name, email} = formData

    const canSave = [username, password, first_name, last_name, email].every(Boolean)
    return (
        <div className='form-container'>
            <div className='Authform'>
                <span style={{display:'flex', flexDirection:'row', width:'100%'}}>
                    <p style={{color:'#6A994E',fontSize:'35px'}}>Register</p>
                    <p style={{color:'#E0B15E', fontSize:'50px', fontFamily:'serif'}}>Here</p>
                </span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username' className=''>Username: </label>
                    <input name='username' id='username' onChange={handleChange} value={username}></input>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' id='password' onChange={handleChange} value={password}></input>
                    <label htmlFor='first_name'>First Name: </label>
                    <input name='first_name' id='first_name' onChange={handleChange} value={first_name}></input>
                    <label htmlFor='last_name'>Last Name: </label>
                    <input name='last_name' id='last_name' onChange={handleChange} value={last_name}></input>
                    <label htmlFor='email'>Email: </label>
                    <input name='email' id='email' onChange={handleChange} value={email}></input>
                    <button className='cookButton' disabled={!canSave}>Complete</button>
                </form>
            </div>
            {errMsg ? errMsg : null}
        </div>
    );
}