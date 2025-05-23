import React, {useContext, useState, useEffect} from 'react'
import {TfiClose} from 'react-icons/tfi';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import Recipe from '../components/Recipe';
import backend from '../api';
import './home.css'
import './homeLess.less'

import SearchComponent from '../components/SearchComponent';

import Reccommended from '../components/Reccommended';
import Recipelistoverlay from '../components/Recipelistoverlay'

export default function Home () {
    const { activeRecipe, changeActive, rmActRecipe} = useContext(AuthContext)
    const [recipes, setRecipes] = useState()
    const [error, setError] = useState('')
    const [hidden, setHidden] = useState(true)
    const [slide, setSlide] = useState('')
    const [searchedFor, setSearchedFor] = useState({})

    const recipeSearch = async (ingredientsList) => {
        try {
            let ingredients = Object.keys(ingredientsList)
            let res = await backend.searchByIngredients(ingredients)
            if (res.status != 200) throw Error
            setRecipes(recipes => [...res.data])
            setSearchedFor(ingredientsList)
            setHidden(null)
        } catch (err) {
            setError("Sorry, cannot reach the cupboard please try again later! ...we'll need a step-ladder")
        }
    }

    const closeList = () => {
        hidden ? null : setHidden(prev => !prev)
    }

    const actRecipe = (recipe) => {
        console.log(recipe)
        changeActive(recipe)
    }

    const listSlider = () => {
        setSlide('slide')
    }

    return (
        <div className='fullBody'> 
            <div className={`recipes-list-overlay ${slide}`} style={hidden ? {display:'none'} : {}}>
                    {recipes ? 
                        <Recipelistoverlay recipes={recipes} actRecipe={actRecipe} listSlider={listSlider} activeRecipe={activeRecipe} searchedFor={searchedFor}/>
                    : null }
            </div>
            <Reccommended actRecipe={actRecipe}/>
            <div className='main-section'>
                <SearchComponent recipeSearch={recipeSearch} closeList={closeList}/>
            </div>
            { activeRecipe ? 
                <div className='active-recipe' style={slide ? null:{justifyContent:'center'}}>
                    <Recipe activeRecipe={activeRecipe} rmActRecipe={rmActRecipe} />
                </div>
                :
                null
            }

        </div>
    );
}