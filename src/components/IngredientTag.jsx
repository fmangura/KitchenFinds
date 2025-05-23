import React, {useContext,useState} from 'react'
import './tags.css'

const IngredientsTag = ({rmIngredient, ingredient, pushSuggested, suggest, status}) => {

    function clickEvent() {
        suggest ? pushSuggested(ingredient) : rmIngredient(ingredient)
    }
    return (
        <>  
            {(status == 'ingredient') ? 
                <div className='ingredient-tag'>
                    <a onClick={clickEvent} className='delIngr'>x</a> 
                    <button className={`tag ${status}`}>{ingredient}</button>
                </div>
            : //---or---
                <span>
                    <button onClick={clickEvent} className={`suggested-tag ${status}`}>{ingredient}</button>
                </span>
            }
        </>
    )
}

export default IngredientsTag