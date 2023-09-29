import React from 'react';
import Spotify from './Spotify';
import { render, screen } from '@testing-library/react';
const { search, getUser, savePlaylist } = Spotify;

describe('Spotify Module', () => {
  const mockFetch = jest.spyOn(window, 'fetch');

  describe('search function', () => {
    it('should return an array of tracks when a valid search term is provided', async () => {
        // Mock the localStorage getItem method
        window.localStorage.getItem = jest.fn().mockReturnValue(
            JSON.stringify({
              "accessToken": "abd123",
              "expirationTime": 1695934359177
            })
          );

    
          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
              tracks: {
                items: [
                  {
                    id: 'track-id-1',
                    name: 'Track 1',
                    artists: [{ name: 'Artist 1' }],
                    album: { name: 'Album 1' },
                    uri: 'spotify:track:track-id-1',
                  },
                ],
              },
            }),
          });
    
        const searchTerm = 'Track 1';
        // Render a test component to call the search function
        render(<div data-testid="search-result">{JSON.stringify(await search(searchTerm))}</div>);
        
        expect(window.localStorage.getItem).toHaveBeenCalledWith('tokenData');
        expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(searchTerm), expect.any(Object));

        // Find the result in the rendered component
        const searchResult = screen.getByTestId('search-result');
        
        expect(searchResult.textContent).toContain('Track 1');
        expect(searchResult.textContent).toContain('Artist 1');
        expect(searchResult.textContent).toContain('Album 1');
        expect(searchResult.textContent).toContain('spotify:track:track-id-1');
      });

      it('should return an empty array when there is no accessToken', async () => {
        window.localStorage.getItem = jest.fn().mockReturnValue(null);
    
        const searchTerm = 'Track 1';
        const result = await search(searchTerm);
    
        expect(result).toEqual([]);
      });
    
      it('should return an empty array when the search request fails', async () => {
        // Mock localStorage.getItem to return an access token
        window.localStorage.getItem = jest.fn().mockReturnValue(
            JSON.stringify({
              "accessToken": "abd123",
              "expirationTime": 1695934359177
            })
          );
    
        // Mock fetch to return a failed response
        mockFetch.mockResolvedValue({
            ok: false
        });
    
        const searchTerm = 'Track 1';
        const result = await search(searchTerm);
    
        expect(result).toEqual([]);
      });

      it('should handle errors gracefully and return an empty array', async () => {
        // Mock localStorage.getItem to throw an error
        window.localStorage.getItem = jest.fn(() => {
          throw new Error('localStorage error');
        });

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
        const searchTerm = 'Track 1';
        const result = await search(searchTerm);
    
        expect(result).toEqual([]);
        // Verify that the error is logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error in search:', expect.any(Error));
      });
  });

  describe('getUser function', () => {
    it('should return the user ID when called with a valid access token', async () => {

      window.localStorage.getItem = jest.fn().mockReturnValue(
        JSON.stringify({
          "accessToken": "abd123",
          "expirationTime": 1695934359177
        })
      );

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            id: 'user-id-1'
        }),
      });

      // Write your test for the getUser function here
      const userId = await getUser();

      expect(mockFetch).toHaveBeenCalled();
      expect(userId).toEqual('user-id-1');
    });
  });

  describe('savePlaylist function', () => {
    it('should return the playlist ID when a playlist is successfully created', async () => {
      // Mock localStorage.getItem and fetch as shown in the previous response
      // Write your test for the savePlaylist function here
    });

    it('should return null when there is no accessToken', async () => {
      // Mock localStorage.getItem and fetch as shown in the previous response
      // Write your test for the savePlaylist function here
    });

    it('should handle errors gracefully and return null', async () => {
      // Mock localStorage.getItem and fetch as shown in the previous response
      // Write your test for the savePlaylist function here
    });
  });
});

const localStorageMock = (function () {
    let store = {};
  
    return {
      getItem(key) {
        return store[key];
      },
  
      setItem(key, value) {
        store[key] = value;
      },
  
      clear() {
        store = {};
      },
  
      removeItem(key) {
        delete store[key];
      },
  
      getAll() {
        return store;
      },
    };
  })(); 

  Object.defineProperty(window, "localStorage", { value: localStorageMock });
