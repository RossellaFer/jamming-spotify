import React from 'react';
import { render, screen } from "@testing-library/react";
import Track from '../components/Track';

describe('Track', () => {
    it('renders track data', () => {
        const mockResponse = {
            "name": "Bad Romance",
            "artist": "Lady Gaga",
            "album": "The Fame Monster",
            "preview_url": "https://url.com",
            "id": "1"
        };

        render(<Track track={mockResponse} />);

        const trackName = screen.getByText('Bad Romance');
        const trackArtist = screen.getByText(/Lady Gaga/i);
        const trackAlbum = screen.getByText(/The Fame Monster/i);
        const trackPreview = screen.getByText(/Preview:/i);
        expect(trackName).toBeInTheDocument();
        expect(trackArtist).toBeInTheDocument();
        expect(trackAlbum).toBeInTheDocument();
        expect(trackPreview).toBeInTheDocument();
    });

    it('renders track data without preview', () => {
        const mockResponse = {
            "name": "Bad Romance",
            "artist": "Lady Gaga",
            "album": "The Fame Monster",
            "preview_url": null,
            "id": "1"
        };
        
        render(<Track track={mockResponse} />);

        const trackPreview = screen.queryByText(/preview/i);
        expect(trackPreview).not.toBeInTheDocument();
    });

});