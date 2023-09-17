const Spotify = {
    async search(term) {
        try {
            const tokenData = JSON.parse(window.localStorage.getItem("tokenData"));
            const accessToken = tokenData.accessToken;
            if(!accessToken) {
                throw new Error("Access token not available.");
            }

            const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if(!response.ok) {
                throw new Error("Search request failed.");
            }

            const jsonResponse = await response.json();
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                image: track.album.images[2].url,
            }));
        } catch (error) {
            console.error("Error in search:", error);
            return [];
        }
    },

    async getUser() {
        try {
            const tokenData = JSON.parse(window.localStorage.getItem("tokenData"));
            const accessToken = tokenData.accessToken;
            if(!accessToken) {
                throw new Error("Access token not available.");
            }

            const endpoint = `https://api.spotify.com/v1/me`;
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if(!response.ok) {
                throw new Error("Request failed.");
            }

            const jsonResponse = await response.json();
            const userId = jsonResponse.id;
        }
        catch(error) {
            console.error("Error in getUser:", error);
            return null;
        }
    },

    async savePlaylist(user_id, tracks, title) {
        try {
            const tokenData = JSON.parse(window.localStorage.getItem("tokenData"));
            const accessToken = tokenData.accessToken;
            if (!accessToken) {
                throw new Error("Access token not available.");
                //display error message
            }

            const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;
            const createPlaylistResponse = await fetch(createPlaylistEndpoint, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                method: "POST",
                body: JSON.stringify({
                  name: title,
                  public: false,
                }),
              });
        
              if (!createPlaylistResponse.ok) {
                throw new Error("Create playlist request failed.");
              }

              const createPlaylistJsonResponse = await createPlaylistResponse.json();
              const playlistID = createPlaylistJsonResponse.id;

                const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
                await fetch(addTracksEndpoint, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "POST",
                    body: JSON.stringify({uris: tracks})
                });
                return playlistID;

            } catch (error) {
            console.error("Error in savePlaylist:", error);
            return null;
        }
    }
}

export default Spotify;