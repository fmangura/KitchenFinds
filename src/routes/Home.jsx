import React, {useContext, useState, useEffect} from 'react'
import {TfiClose} from 'react-icons/tfi';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import IngredientsTag from '../components/IngredientTag';
import Recipes from '../components/RecipesOverlay';
import Recipe from '../components/Recipe';
import backend from '../api';
import './home.css'
import './homeLess.less'
import Logo from '../assets/KitchenWordLogo.svg'
import Rat from '../assets/rat.svg'

export default function Home () {
    const {currUser, isLoggedIn, logout, faveRecipes} = useContext(AuthContext)
    const [ingredientsList, setIngredientList] = useState({})
    const [search, setSearch] = useState('')
    const [recipes, setRecipes] = useState()
    const [activeRecipe, setActiveRecipe] = useState()
    const [error, setError] = useState('')
    const [hidden, setHidden] = useState(true)
    const [suggest, setSuggest] = useState([])
    const [slide, setSlide] = useState('')
    const [faves, setFaves] = useState(async () => await backend.getUserRecipes())

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }

    const addIngredient = (e) => {
        e.preventDefault()
        if (!search) return
        changeSuggestions()
        setIngredientList(ingredientsList => ({...ingredientsList, [search]: null}))
        setSearch('')
    }

    const pushSuggested = (word) => {
        setIngredientList(ingredientsList => ({...ingredientsList, [word]: null}))
    }

    const changeSuggestions = async () => {
        try {
            await backend.getSuggestions(search).then((res) => {setSuggest(suggest => [...res])})
        } catch (err) {

        }
    }

    const rmIngredient = (word) => {
        let newList = {...ingredientsList};
        delete newList[word];
        setIngredientList(newList);
    }

    const recipeSearch = async () => {
        try {
            let ingredients = Object.keys(ingredientsList)
            let res = await backend.searchByIngredients(ingredients)
            if (res.status != 200) throw Error
            setRecipes(recipes => [...res.data])
            setHidden(null)
        } catch (err) {
            setError("Sorry, cannot reach the cupboard please try again later! ...we'll need a step-ladder")
        }
    }

    const actRecipe = (recipe) => {
        setActiveRecipe(recipe)
    }

    const rmActRecipe = () => {
        setActiveRecipe(activeRecipe => {})
    }

    const reset = () => {
        setIngredientList(ingredientsList => {return {} })
        setSuggest(suggest => {return [] } )
        setSearch('')
    }

    const listSlider = () => {
        setSlide('slide')
    }

    return (
        <div className='fullBody'>  
            <div className='left-cards'>
                {recipes ? 
                    <div className={`recipes-list-overlay ${slide}`} style={hidden ? {display:'none'} : {}}>
                        {recipes.length > 0 ? 
                            <div className='recipe-list'>
                                {recipes.map((recipe) => {return <Recipes key={recipe.id} id={recipe.id} image={recipe.img} name={recipe.name} ingredients={recipe.allIngr} searchedFor={ingredientsList} actRecipe={actRecipe} listSlider={listSlider} activeRecipe={activeRecipe}/>})} 
                            </div> 
                            :
                            <div className='card' style={{justifySelf:'center'}}>
                                <h2>Could not find recipes with these ingredients</h2>
                            </div>
                        }
                    </div>
                : null}
                <div className='main' onClick={() => {
                    (hidden ? null : setHidden(prev => !prev));
                    (setSlide(''));
                    }}>
                    <div className='card--inverted card'>
                        <form onSubmit={addIngredient}>
                        <h2>Add Ingredients: </h2>
                        <label htmlFor="search" className='input'>
                            <input type="text" className="input__field" name='ingredient' placeholder=' ' onChange={handleSearch} value={search}/>
                            <span className="input__label">Input ingredients...</span>
                        </label>
                        <div className="button-group">
                            <button className='addButton'>Add</button>
                            </div>
                        </form>
                    </div>
                    <div className='suggestions card'>
                        <h2 style={{marginRight:'20px'}}>Suggestions: </h2>
                        <ul id='suggested-words'>
                            {suggest ? suggest.map((word) => {
                                return <IngredientsTag key={word} ingredient={word} pushSuggested={pushSuggested} suggest={true} status='clickable'/>}) : null}
                        </ul>
                    </div>
                    <div className='card list-of-ingredients card--accent'>
                        <h2>Ingredients: </h2>
                        <ul>
                            {Object.keys(ingredientsList) ? Object.keys(ingredientsList).map((ingr) => {return <IngredientsTag key={ingr} rmIngredient={rmIngredient} ingredient={ingr} status='clickable'/>}) : null } 
                        </ul>
                    </div>
                    <button style={{marginTop:'20px'}} onClick={recipeSearch} className='cookButton'>Cook!</button>
                    <button type="reset" onClick={reset}>Clear</button>
                    {error ? <p>{error}</p> : null}
                </div>
            </div>
            <div className='right-cards'>
                <div className='infocard card'>
                    {activeRecipe ? 
                        <div className='cook-book'>
                            <button onClick={rmActRecipe} id='close'><TfiClose/></button>
                            <Recipe id={activeRecipe.id} name={activeRecipe.name} image={activeRecipe.image} allIngredients={activeRecipe.ingredients} recipeInfo={activeRecipe.recipeInfo} />
                        </div> 
                        :
                        <>
                            <img src={Logo} alt="" />
                            <p style={{margin:'20px'}}>
                                Ever looked in your fridge after forgetting to go grocery shopping? Don't have time to go grocery shopping? Want to try figuring out a meal? Try looking here!
                                <br/>
                                <br/>
                                For finding recipes that utilizes what you have left in the fridge. Just simply add the ingredients one-by-one into the list and cook!
                                <br/> 
                                <br/> 
                                Make sure you're checking your expiration dates! 😅
                            </p>
                        </>
                    }
                    </div>
                <img src={Rat} alt="" style={{height:'100px', width:'100px'}}/>
            </div>
        </div>
    );
}