import React from 'react';
import {getByRole, render, screen} from '@testing-library/react'
import App from '../src/App'
import { test } from 'vitest';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />)   
    });

    it('Snapshot', () => {
        const { asFragment } = render(<App />);
        expect(asFragment).toMatchSnapshot();
    });

    it('Proper elements render', () => {
        render(<App />);
        screen.getByRole('button', {name:'Login'})
    })
})