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
        const trackListMockResponse = [
                {
                    name: "Bad Romance",
                    artist: "Lady Gaga",
                    album: "The Fame Monster",
                    id: "1"
                },
                {
                    name: "Poker Face",
                    artist: "Lady Gaga",
                    album: "The Fame",
                    id: "2"
                }
            ];
        render(<Playlist trackList={trackListMockResponse} />);
        
    });
});