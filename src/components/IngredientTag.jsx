import React, {useContext,useState} from 'react'
import './tags.css'

const IngredientsTag = ({rmIngredient, ingredient, pushSuggested, suggest, status}) => {
    function clickEvent() {
        suggest ? pushSuggested(ingredient) : rmIngredient(ingredient)
    }
    return (
        <button onClick={clickEvent} className={`tag ${status}`}>{ingredient}</button>
    )
}

export default IngredientsTag