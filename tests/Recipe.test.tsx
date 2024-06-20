import React from 'react'
import {queryAllByText, render, screen} from '@testing-library/react'
import Recipe from '../src/components/Recipe';

describe('Recipe component works properly', () => {
    it('renders without crashing with Name', () => {
        render(<Recipe id={'123196'} name={'test'} image={''} recipeInfo={{steps:[{number:1, step:'teststep', ingredients:[], equipment:[]}]}} allIngredients={['ingr1', 'ingr2']}/>)
        screen.queryByText('test')
    });
})