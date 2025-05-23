import React from 'react';
import { AuthContext } from '../src/context';
import {fireEvent, getByText, queryAllByText, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest';
import Recipes from '../src/components/RecipesOverlay';

vi.mock('../src/api')

const renderComponent = () => {
    const value = {currUser:'u1', isLoggedIn:'true', faveRecipes:['1'], addFave:vi.fn()}
    return render(
        <AuthContext.Provider value={value} >
            <Recipes id={1} image={''} name={'test1'} ingredients={['ingredientButton']} searchedFor={['test']} actRecipe={''} listSlider={()=>vi.fn()} activeRecipe={''}/>
        </AuthContext.Provider>
    );
}

describe('RecipeOverlay Route test', () => {
    it('renders overlay', () => {
        renderComponent();
        const button = screen.getByRole('button', {name:'ingredientButton'})
        expect(button).toBeInTheDocument()
    });

    it('checks snapshot', () => {
        const {asFragment} = renderComponent();
        expect(asFragment).toMatchSnapshot();
    })

})