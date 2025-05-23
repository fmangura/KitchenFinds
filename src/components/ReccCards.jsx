import React, {useState, useContext} from 'react'
import backend from '../api'
import { AuthContext } from '../context';
import './ReccCards.css'
import IngredientsTag from '../components/IngredientTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf, faUtensils } from '@fortawesome/free-solid-svg-icons'

export default function ReccCard({recipeInfo}) {
    const [hideInfo, setHideInfo] = useState(true)
    const { changeActive } = useContext(AuthContext)
    let ingredients = recipeInfo.extendedIngredients
    const {id, image, title} = recipeInfo

    const toggleInfo = () => {
        setHideInfo(!hideInfo)
    }

    const sendRecipeInfo = async () => {
        let res = await backend.getInstructions(id);
        if (Object.keys(res).length == 0) res = {steps: [{number:0, step: 'No Instructions Found', ingredients: [], equipment: [] }]};
        changeActive({id: id,
        image: image,
        name: title,
        ingredients: ingredients,
        recipeInfo: res
        })
    }

    return (
        <div className='indv-card' onClick={sendRecipeInfo}>
            <div className={'top-of-card'} >
                <img src={recipeInfo.image} alt="No image" />
                <h5 className='recipe-name' onMouseEnter={toggleInfo}> {recipeInfo.title}</h5>
            </div>
            <div className={hideInfo ? 'hideInfo indv-card-text':'showInfo indv-card-text'} onMouseLeave={toggleInfo} >
                <span className='info-icons'>
                    <p> <FontAwesomeIcon icon={faHourglassHalf} /> {recipeInfo.readyInMinutes} min</p>
                    <p> <FontAwesomeIcon icon={faUtensils} /> {recipeInfo.servings} servings</p>
                </span>
                {ingredients.map(({name, id}) => <IngredientsTag key={id} ingredient={name} status='neautral'/> )}
            </div>
        </div>
    )
}