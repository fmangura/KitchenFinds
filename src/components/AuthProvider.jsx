import React, {useState, useEffect} from 'react';
import { AuthContext } from '../context';

import Cookies from 'universal-cookie';
import backend from '../api';
const cookies = new Cookies(null, { path: '/' });

function Auth({ children }) {
    const [currUser, setCurrUser] = useState(cookies.get('user'));
    const [isLoggedIn, setLoggedIn] = useState(!!cookies.get('user_token'));
    const [faveRecipes, setFaveRecipes] = useState([]);
    const [activeRecipe, setActiveRecipe] = useState(cookies.get('active_recipe'));
    const [errorMsg, setErrorMsg] = useState('');

    const login = async () => {
        if (cookies.get('user_token')) {
            let res = await backend.getUserRecipes()
            setFaveRecipes(res.map((recipe) => recipe.id))
            setCurrUser(cookies.get('user'))
            setLoggedIn(!!cookies.get('user_token'));
        }
    }

    const logout = () => {
        if(cookies.get('user')) {
            cookies.remove('user');
            cookies.remove('user_token',{ path: '/' });
            setLoggedIn(false);
            setCurrUser(cookies.get('user'));
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

    const changeActive = (obj) => {
        setActiveRecipe({})
        cookies.set('active_recipe', obj)
        setActiveRecipe(obj)
    }

    const rmActRecipe = () => {
        setActiveRecipe()
        cookies.remove('active_recipe')
        setSlide('')
    }

    const popError = (err) => {
        setErrorMsg(err);
        setTimeout(() => setErrorMsg(''), 2000);
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
            activeRecipe,
            changeActive,
            rmActRecipe,
            errorMsg,
            popError
        }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default Auth;