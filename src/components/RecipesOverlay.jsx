import React, {useContext,useEffect,useState} from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import {LiaCookieSolid, LiaCookieBiteSolid} from 'react-icons/lia'
import backend from '../api';
import IngredientsTag from '../components/IngredientTag';
import './recipeOverlay.css';

const Recipes = ({id, image, name, ingredients, searchedFor, actRecipe, listSlider, activeRecipe}) => {
    const {faveRecipes, addFave, delFave} = useContext(AuthContext)
    const [fave, setFave] = useState(() => faveRecipes.includes(id))
    const [isActive, setIsActive] = useState(actRecipe.id == id)

    useEffect(() => {
        const changeActive = () => {
            setIsActive(actRecipe.id == id)
        };
        changeActive();
    },[activeRecipe])

    const sendRecipeInfo = async () => {
        let res = await backend.getInstructions(id);
        if (Object.keys(res).length == 0) res = {steps: [{number:0, step: 'No Instructions Found', ingredients: [], equipment: [] }]};
        actRecipe({id: id,
        image: image,
        name: name,
        ingredients: ingredients,
        recipeInfo: res
        })
        listSlider()
    }

    const toggleFave = () => {
        fave ? delFave(id) : addFave(id);
        setFave(fave => !fave)
    }

    return (
        <div className={`recipe-card card ${isActive}`} id={id} >
            <div className='card-body' onClick={sendRecipeInfo}>               
                <h3>{name}</h3>
                <ul style={{listStyle:'none'}}>
                    {ingredients.map(ingr => {return ingr in searchedFor ? <IngredientsTag key={ingr} ingredient={ingr} status='badge'/> : <IngredientsTag ingredient={ingr} status='notincluded badge' />})}
                </ul>
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <img src={`${image}`} alt="No Image" />
                <i onClick={toggleFave}>
                    {fave ? <LiaCookieBiteSolid/> : <LiaCookieSolid/>}
                </i>
            </div>
        </div>
    )
}

export default Recipes