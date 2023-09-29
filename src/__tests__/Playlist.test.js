import React from 'react';
import { render, screen } from "@testing-library/react";
import Playlist from '../components/Playlist';

describe('Playlist', () => {
    // it('renders empty playlist on first load', async () => {
    //     const playlistNameMockResponse = "New Playlist";
    //     const trackListMockResponse = [];
    //     render(<Playlist trackList={trackListMockResponse} playlistName={playlistNameMockResponse} />);
    //     const emptyPlaylistText = await screen.findByText('Bad Romance');
    //     expect(emptyPlaylistText).nottoBeInTheDocument();
    // });

    it('renders playlist with tracks', async () => {
        const errors = [];
        const trackListMockResponse = [
                {
                    name: "Bad Romance",
                    artist: "Lady Gaga",
                    album: "The Fame Monster",
                    preview_url: "https://url.com",
                    id: "1"
                },
                {
                    name: "Poker Face",
                    artist: "Lady Gaga",
                    album: "The Fame",
                    preview_url: "https://url.com",
                    id: "2"
                }
            ];
        render(<Playlist trackList={trackListMockResponse} errors={errors} />);

        const track1 = await screen.findByText('Bad Romance');
        const track2 = await screen.findByText('Poker Face');
        expect(track1).toBeInTheDocument();
        expect(track2).toBeInTheDocument();
        
    });
});