import React, {useContext, useState} from 'react';
import useForm from '../helper/userForm'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import backend from '../api'
import './auth.css'

export default function LoginForm () {
    const initialForm = {
        username: '',
        password: ''
    }
    const navigate = useNavigate();
    const {login, isLoggedIn} = useContext(AuthContext)
    const {formData, handleChange, resetForm} = useForm(initialForm)
    const [errMsg, setErrMsg] = useState('')

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
            setErrMsg(err.message)
        }
    }

    return (
        <div className='authDiv' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div className='Authform card' style={{justifyContent:'center', display:'flex', marginBottom:'10px'}}>
                <h1 style={{marginRight:'20px'}}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username' className=''>Username: </label>
                    <input name='username' placeholder='username' id='username' onChange={handleChange} value={formData.username}></input>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' placeholder='password' id='password' onChange={handleChange} value={formData.password}></input>
                    <button>Login</button>
                </form>
            </div>
            {errMsg ? errMsg : null}
        </div>
    );
}