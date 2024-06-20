import React, {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import backend from '../api'
import IngredientsTag from '../components/IngredientTag';
import useForm from '../helper/userForm';

import Rat from '../assets/rat.svg'
import Foods from '../assets/8.svg'
import Vegs from '../assets/9.svg'
import Hangfruit from '../assets/hangfruit.svg'
import Celery from '../assets/celery.svg'

import './profile.css'

export default function Profile () {
    const navigate = useNavigate();
    const {isLoggedIn, logout} = useContext(AuthContext)
    const [recipes, setRecipes] = useState([])
    const [hidden, setHidden] = useState(true)
    const initialForm = {
        password: ''
    }
    const {formData, handleChange, resetForm} = useForm(initialForm)
    
    useEffect(() => {
        const addRecipes = async () => {
            let res = await backend.getUserRecipes()
            if (res) setRecipes(recipes => res)
        }
        addRecipes()
    },[])
    const [errMsg, setErrMsg] = useState('')

    const deleteUser = async (e) => {
        e.preventDefault()
        try {
            await backend.delUser(formData).then()
            logout()
        } catch (err) {
            return err
        }
    }
    const delCancel = () => {
        resetForm()
        setHidden(true)
    }

    if (!isLoggedIn) return <Navigate to={'/'}/>

    return (
        <div className='userRecipes'>
            <img className='background-images' id='foods' src={Foods} />
            <img className='background-images' id='vegs' src={Vegs} />
            <img className='background-images' id='hangfruit' src={Hangfruit} />
            <img className='background-images' id='celery' src={Celery} />
            {recipes[0] != null ?
                <div className='user-recipe-list'>
                {recipes.map(({id, name, allIngr, img}, idx) =>  
                    <div className='card userRecipe-card'>
                        <div className='information'>
                            <h1>{name}</h1>
                            <ul className='user-ingr'>
                                {allIngr.map(ingr => {return <li>{ingr}</li>})}
                            </ul>
                            <small>{idx+1}</small>
                        </div>
                        <div className='image'>
                            {img ? <img src={img} alt='No image found' /> : <><img src={Rat} /><p>No Image Found</p></>}
                        </div>
                    </div>
                )} 
                </div> 
                :
                <div className='user-recipe-list' style={{width:'60%'}}>
                    <h1>No saved recipes found.</h1>
                </div>
            }
            <a onClick={() => {hidden ? setHidden(false) : setHidden(true)}} className='delete-button'>Delete Profile</a>
            <div style={hidden ? {display:'none'} : {}} className='del-overlay'>
                <div className='card-del-profile card card--accent'>
                    <h3>Want to delete your pofile?</h3>
                    <p>Please input your password to complete request.</p>
                    <form>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' placeholder='password' id='password' onChange={handleChange} value={formData.password}></input>
                    <div style={{display:'flex', marginTop:'30px', justifyContent:'space-between'}}>
                        <button onClick={delCancel}>Cancel</button>
                        <a onClick={deleteUser} id='del-complete'>Delete</a>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}