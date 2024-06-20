import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import IngredientsTag from './IngredientTag'

function Page({number, step, ingredients, equipment, length}) {

    return (
        <div className='card page-card' style={{backgroundColor:'#FFF'}}>
            <h5>{number}</h5>
            <p>{step}</p>
            {ingredients.length > 0 ? 
                <>
                    <h5>Ingredients: </h5>
                    {ingredients.map(ingr => {return <IngredientsTag key={ingr} ingredient={ingr} status='badge'/> })}
                </>
            : null}

            {equipment.length > 0 ? 
                <>
                    <h5>Equipment:</h5>
                    <ul>
                        {equipment ? equipment.map(({item}) => {return <li>{item}</li>}) : null}
                    </ul>
                </> : null}    

            {length ? 
            <>
                <h5>Time: </h5> 
                <p>{length.number} {length.units}</p>
            </> : null}
        </div>
    )
}

export default Page