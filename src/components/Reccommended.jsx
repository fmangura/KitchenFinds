import React, {useState, useEffect, useContext} from 'react'
import backend from '../api'
import ReccCards from './ReccCards.jsx'
import './Reccommended.css'
import { AuthContext } from '../context';

export default function Reccommended({actRecipe}){
    const [timeOfDay, setTimeofDay] = useState()
    const [recipeReccs, setRecipeReccs] = useState([])
    const { activeRecipe, changeActive, rmActRecipe} = useContext(AuthContext)

    let mealType = {Morning:'breakfast', Afternoon:'lunch', Evening:'dinner'}

    useEffect(() => {
        const findTime = async () => {
            let date = new Date();
            let hours = date.getHours()
            let message
            if (hours < 12) {
                message = "Morning";
              } else if (hours < 18) {
                message = "Afternoon";
              } else {
                message = "Evening";
              }
            setTimeofDay(message)
            let recipes = await backend.getRecommended(mealType[message])
            setRecipeReccs(recipes)
        }
        findTime();
    },[])

    return (
        <div className='reccommend-section'>
            <span className='recc-title'>
                <h2>Good,</h2>
                <h1>{timeOfDay}!</h1>
                <p>Hungry? Might we recommend...</p>
            </span>
            <div className='recc-cards'>
                {recipeReccs.map((recipe) => <ReccCards recipeInfo={recipe} changeActive={changeActive}/>)}
            </div>
        </div>
    );
}