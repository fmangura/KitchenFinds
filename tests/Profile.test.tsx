import React from 'react';
import { AuthContext } from '../src/context';
import {fireEvent, getByText, queryAllByText, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from '../src/routes/Profile'
import backend from '../src/api';
import { vi } from 'vitest';
import { Router, Routes, BrowserRouter } from 'react-router-dom';

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const renderComponent = () => {
    const value = {currUser:'u1', isLoggedIn:'true'}
    return render(
        <AuthContext.Provider value={value} >
                <Profile />
        </AuthContext.Provider>
    );
}

describe('Profile route works', () => {
    it('renders without crashing with Name', () => {
        renderComponent();
        const button = screen.queryByText('Delete Profile')
        expect(button).toBeInTheDocument()
    });

    it('checks snapshot', () => {
        const {asFragment} = renderComponent();
        expect(asFragment).toMatchSnapshot();
    })

    it('Can see delete form', () => {
        renderComponent();
        const delbutton = screen.getByText('Delete Profile')
        fireEvent.click(delbutton)
        expect(screen.getByText('Please input your password to complete request.')).toBeVisible()
    });

})