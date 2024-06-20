    import React, {useState, useEffect} from 'react'
    import { useParams } from 'react-router-dom'
    import backend from '../api';
    import Page from './Pages'
    import IngredientsTag from './IngredientTag';

    function RecipeRoute({id, name, image, recipeInfo, allIngredients}) {
        const [page, setPage] = useState(0)
        const [currentPage, setCurrentPage] = useState(recipeInfo.steps[0])
        
        useEffect(() => {
            const newRecipe = () => {
                setPage(0)
                setCurrentPage(recipeInfo.steps[page])
            }
            newRecipe();
        },[id])

        useEffect(() => {
            const changePage = () => {
                setCurrentPage(recipeInfo.steps[page])
            };
            changePage();
        },[page])
            
        function nextPage() {
            (page == recipeInfo.steps.length-1) ? setPage(0) : setPage(page => page + 1);
        }

        function prevPage() {
            (page > 0) ? setPage(page => page - 1) : null;
        }

        return (
            <div className='full-recipe-card'>
                <div className='card-image'>
                    <img src={image} alt={name} />
                </div>
                <h1>{name}</h1>
                <div className='pages'>
                    <Page number={currentPage.number} ingredients={currentPage.ingredients} equipment={currentPage.equipment} length={currentPage.length} step={currentPage.step}/>
                    <div className='page-turners'>
                        <a onClick={prevPage}>Prev</a>
                        <small>{currentPage.number}/{recipeInfo.steps.length}</small>
                        <a onClick={nextPage}>Next</a>
                    </div>
                </div>
            </div>
        )
    }

    export default RecipeRoute