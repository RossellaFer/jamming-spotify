import React from 'react';
import SearchResults from '../components/SearchResults';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";



describe('Search Results', () => {
    beforeEach(() => {
        jest.mock("../__mocks__/Spotify.js");
    })
    
    it('should render Search Results Header component', async () => {
        render(<SearchResults />);
        const SearchResultsHeader = screen.getByText('Results');
        expect(SearchResultsHeader).toBeInTheDocument();
    });

    it('renders no search results on page load', async () => {
        render(<SearchResults />);
        const noSearchResults = screen.getByText('Search for songs, albums or artists to see tracks');
        expect(noSearchResults).toBeInTheDocument();
    });

    // it('renders search results after search', async () => {
    //     render(<SearchResults />);
    //     await screen.findAllByText('Bad Romance');
    // });

});