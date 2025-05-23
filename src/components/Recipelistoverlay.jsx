import React from 'react'
import RecipesListCard from './RecipesOverlayCards'
import './Recipelistoverlay.css'

export default function Recipelistoverlay({recipes, actRecipe, listSlider, activeRecipe, searchedFor}) {
    return (
        <>
            {recipes.length > 0 ? 
                <div className='recipe-list'>
                    {recipes.map((recipe) => {return <RecipesListCard key={recipe.id} id={recipe.id} image={recipe.img} name={recipe.name} ingredients={recipe.allIngr} actRecipe={actRecipe} listSlider={listSlider} activeRecipe={activeRecipe} searchedFor={searchedFor}/> })} 
                </div> 
                :
                <div className='card' style={{justifySelf:'center'}}>
                    <h2>Could not find recipes with these ingredients</h2>
                </div>
            }
        </>
    )
}