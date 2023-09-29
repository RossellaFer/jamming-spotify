const mockResponse = [
    {
        'album': "A star is born",
        'artist': "Lady Gaga",
        'id': "1",
        'image': "https://i.scdn.co/image/ab67616d0000b273c9c0d4c8d9b7a2a4b1a2a4b1",
        'name': "Shallow",
        'uri': "spotify:track:1",
    },
    {
        'album': "The Fame Monster (Deluxe Edition)",
        'artist': "Lady Gaga",
        'id': "2",
        'image': "https://i.scdn.co/image/ab67616d0000b273c9c0d4c8d9b7a2a4b1a2a4b1",
        'name': "Bad Romance",
        'uri': "spotify:track:2",
    }
]

const Spotify = {
    async search(term) {
        return mockResponse;
    }
}

export default Spotify;