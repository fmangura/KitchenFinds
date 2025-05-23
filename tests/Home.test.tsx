import React from 'react';
import { AuthContext } from '../src/context';
import {fireEvent, getByText, queryAllByText, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../src/routes/Home'
import backend from '../src/api';
import { vi } from 'vitest';

vi.mock('../src/api')

const renderComponent = () => {
    const value = {currUser:'u1', isLoggedIn:'true'}
    return render(
        <AuthContext.Provider value={value} >
            <Home/>
        </AuthContext.Provider>
    );
}

describe('Home', () => {
    it('renders without rerouting', () => {
        renderComponent();
        const button = screen.getByRole('button', {name:'Cook!'})
        expect(button).toBeInTheDocument()
    });

    it('checks snapshot', () => {
        const {asFragment} = renderComponent();
        expect(asFragment).toMatchSnapshot();
    })

    it('able to input and add', async () => {
        backend.getSuggestions = vi.fn().mockImplementation(()=>['spinach', 'fries'])
        renderComponent();
        const ingrInput = screen.getByRole('textbox',{name:''});
        const add = screen.getByRole('button', {name:'Add'});
        fireEvent.change(ingrInput, {target:{value:'spinach'}});
    })

})