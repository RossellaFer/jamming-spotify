import React from 'react';
import { render, screen } from "@testing-library/react";
import Track from '../components/Track';

describe('Track', () => {
    it('renders track data', () => {
        const mockResponse = {
            "name": "Bad Romance",
            "artist": "Lady Gaga",
            "album": "The Fame Monster",
            "id": "1"
        };
        render(<Track track={mockResponse} />);

        const trackName = screen.getByText('Bad Romance');
        const trackArtist = screen.getByText(/Lady Gaga/i);
        const trackAlbum = screen.getByText(/The Fame Monster/i);
        expect(trackName).toBeInTheDocument();
        expect(trackArtist).toBeInTheDocument();
        expect(trackAlbum).toBeInTheDocument();
    });


});