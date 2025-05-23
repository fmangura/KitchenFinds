import React, {useContext, useState, useEffect} from 'react'
import {TfiClose} from 'react-icons/tfi';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import IngredientsTag from '../components/IngredientTag';
import backend from '../api';
import './SearchComponent.css'

export default function SearchComponent({recipeSearch, closeList}) {
    const [search, setSearch] = useState('')
    const [suggest, setSuggest] = useState([])
    const [error, setErrMsg] = useState('')
    const [ingredientsList, setIngredientList] = useState({})

    const pushSuggested = (word) => {
        setIngredientList(ingredientsList => ({...ingredientsList, [word]: null}))
    }

    const rmIngredient = (word) => {
        let newList = {...ingredientsList};
        delete newList[word];
        setIngredientList(newList);
    }

    const addIngredient = async (e) => {
        e.preventDefault()
        if (!search) return
        await changeSuggestions()
        setIngredientList(ingredientsList => ({...ingredientsList, [search]: null}))
        setSearch('')
    }

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }

    const changeSuggestions = async () => {
        try {
            await backend.getSuggestions(search).then((res) => {setSuggest(suggest => [...res])})
        } catch (err) {

        }
    }

    const reset = () => {
        setIngredientList(ingredientsList => {return {} })
        setSuggest(suggest => {return [] } )
        setSearch('')
    }

    return (
        <div className='main' onClick={() => closeList()}>
            <div className='search-section' style={{width:'40%'}}>
                <span className='searchbar'>
                    <h2 id='search-by'>Search by ingredients: </h2>
                    <form className='searchForm'>
                        <label htmlFor="search" className='input'>
                            <input type="text" className="input-field" name='ingredient' placeholder=' ' onChange={handleSearch} value={search}/>
                        </label>
                        <button className='addButton' onClick={addIngredient}>Add</button>
                    </form>
                </span>
                <span className='suggested'>
                    <h2 style={{marginRight:'20px'}}>Suggestions: </h2>
                    <ul id='suggested-words'>
                        {suggest ? suggest.map((word) => {
                            return <IngredientsTag key={word} ingredient={word} pushSuggested={pushSuggested} suggest={true} status='suggestion'/>}) : null}
                    </ul>
                </span>
            </div>
            <div className='right-section'>
                <div className='list-of-ingredients'>
                    <h2>Ingredients: </h2>
                    <ul>
                        {Object.keys(ingredientsList) ? Object.keys(ingredientsList).map((ingr) => {return <IngredientsTag key={ingr} rmIngredient={rmIngredient} ingredient={ingr} status='ingredient'/>}) : null } 
                    </ul>
                </div>
                <span>
                    <button style={{marginTop:'20px'}} onClick={() => recipeSearch(ingredientsList)} className='cookButton'>Cook!</button>
                    <a onClick={reset}>Clear</a>
                </span>
            </div>
            {error ? <p>{error}</p> : null}
        </div>
    )
}
