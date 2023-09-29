import React from 'react';
import App from '../App';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe("App", () => {

    test('renders h1 element in the page', () => {
        render(<App />);
        const header = screen.getByRole('heading', {level: 1});
        expect(header).toBeInTheDocument();
    });

    test ('renders login button on first login', () => {
        render(<App />);
        expect(screen.getByText(/login/)).toBeInTheDocument();
    });

});