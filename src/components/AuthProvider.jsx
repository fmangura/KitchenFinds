import React, {useState, useEffect} from 'react';
import { AuthContext } from '../context';

import Cookies from 'universal-cookie';
import backend from '../api';
const cookies = new Cookies(null, { path: '/' });

function Auth({ children }) {
    const [currUser, setCurrUser] = useState(cookies.get('user'));
    const [isLoggedIn, setLoggedIn] = useState(!!cookies.get('user_token'));
    const [faveRecipes, setFaveRecipes] = useState([])

    const login = async () => {
        if (cookies.get('user_token')) {
            setLoggedIn(true);
            let res = await backend.getUserRecipes()
            setFaveRecipes(res.map((recipe) => recipe.id))
            setCurrUser(cookies.get('user'))
        }
    }

    const logout = () => {
        if(cookies.get('user')) {
            cookies.remove('user')
            cookies.remove('user_token',{ path: '/' })
            setLoggedIn(false);
        }
    }

    const addFave = async (ref_id) => {
        let res = await backend.addToFave(ref_id)
        setFaveRecipes(faveRecipes => [...faveRecipes, ref_id])
    }

    const delFave = async (ref_id) => {
        let res = await backend.delFave(ref_id)
        setFaveRecipes(res.map((recipe) => recipe.id))
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            login,
            logout,
            currUser,
            faveRecipes,
            addFave,
            delFave,
        }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default Auth;