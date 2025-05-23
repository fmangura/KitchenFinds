    import React, {useState, useEffect, memo} from 'react'
    import Page from './Pages'
    import Timer from '../helper/Timer'
    import IngredientsTag from './IngredientTag';

    import './Recipe.css'

    function RecipeRoute({activeRecipe, rmActRecipe}) {
        const {id, name, image, recipeInfo} = activeRecipe
        const [page, setPage] = useState(0)
        const [currentPage, setCurrentPage] = useState()
        
        useEffect(() => {
            const newRecipe = () => {
                setPage(0)
                setCurrentPage(recipeInfo.steps[page])
            }
            newRecipe();
        },[id, activeRecipe])

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
                    <div className='recipe-title'>
                        <h1>{name}</h1>
                        <Timer />
                    </div>
                    <i onClick={() => rmActRecipe()}>X</i>
                </div>
                { currentPage ?
                    <div className='pages'>
                        <Page number={currentPage.number} ingredients={currentPage.ingredients} equipment={currentPage.equipment} length={currentPage.length} step={currentPage.step}/>
                        <div className='page-turners'>
                            <a onClick={prevPage}>Prev</a>
                            <small>{currentPage.number}/{recipeInfo.steps.length}</small>
                            <a onClick={nextPage}>Next</a>
                        </div>
                    </div>
                    :
                    null
                }

            </div>
        )
    };

    export default RecipeRoute