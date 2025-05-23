import React, { useContext } from 'react'
import { AuthContext } from '../context'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/KitchenLogo.svg'
import './nav.css'

function Nav() {
    const navigate = useNavigate()
    const {currUser, isLoggedIn, logout} = useContext(AuthContext)

    return (
        <>
            <div className='Nav'>
                <img src={Logo} alt="" onClick={() => navigate('/')}/>
                <div className='menu-links'>
                    {currUser ? 
                        <ul>
                            <li><a onClick={() => navigate('/')}> Home </a></li>
                            <li><a onClick={() => navigate('/profile')}> My Menu </a></li>
                            <li><a onClick={() => logout()} className='log'> Logout</a></li>
                        </ul> : 
                        <ul>
                            <li><a onClick={() => navigate('/')}> Home </a></li>
                            <li><a onClick={() => navigate('/login')}> Login</a></li>
                        </ul>
}
                </div>
            </div>
        </>
    )
}

export default Nav