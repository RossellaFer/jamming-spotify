import React from 'react';
import SearchBar from '../components/SearchBar';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockSetSearchInput = jest.fn();

describe('SearchBar', () => {
    it('should render SearchBar component', async () => {
        render(<SearchBar />);
        const searchBar = screen.getByPlaceholderText('Enter A Song, Album, or Artist');
        expect(searchBar).toBeInTheDocument();
    });

    it('should render search button', async () => {
        render(<SearchBar />);
        const searchButton = screen.getByText('Search');
        expect(searchButton).toBeInTheDocument();
    });

    it('should be able to type in search bar', async () => {
        render(<SearchBar 
            searchInput={'Lady Gaga'}
            setSearchInput={mockSetSearchInput}
        />);
        const searchBar = screen.getByPlaceholderText('Enter A Song, Album, or Artist');
        fireEvent.change(searchBar, { target: { value: 'Lady Gaga' } });
        expect(searchBar).toHaveValue('Lady Gaga');
    });

    // it('should return to empty screen after the form is submitted', async () => {
    //     render(<SearchBar 
    //         searchInput={'Lady Gaga'}
    //         setSearchInput={mockSetSearchInput}
    //     />);
    //     const searchBar = screen.getByPlaceholderText('Enter A Song, Album, or Artist');
    //     const searchButton = screen.getByText('Search');
    //     fireEvent.change(searchBar, { target: { value: 'Lady Gaga' } });
    //     fireEvent.click(searchButton);
    //     await waitFor(() => expect(searchBar).toHaveValue(''));
    // });
});