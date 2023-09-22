import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Login from "./components/Login";
import Spotify_auth from "./utils/Spotify_auth";
import Spotify from "./utils/Spotify";
import { ReactComponent as LogoutIcon } from './assets/logout.svg';
import Button from 'react-bootstrap/Button';

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const authentication_endpoint = Spotify_auth.generateEndpoint();
  const token = Spotify_auth.authorizeApp();

  useEffect(() => {
    setAccessToken(token);
  }, [token]);


  // Function to handle adding a track to the playlist
  function handleAddTrack(track) {
    if (trackList.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setTrackList([...trackList, track]);
  }

  // Function to handle removing a track from the playlist
  function handleRemoveTrack(id) {
    setTrackList(trackList.filter((track) => track.id !== id));
  }

  // Function to handle playlist name change
  function handleNameChange(e) {
    const name = e.target.value;
    setPlaylistName(name);
  }

  // Function to handle search form submission
  async function handleSearchSubmit(form) {
    await Spotify.search(form).then((results) => {
      if(!results) {
        setSearchResults([]);
      }
      setSearchResults(results);
    });
  }

  // Function to save the playlist to Spotify
  const handleSavePlaylist = async () => {
    let userId = window.localStorage.getItem("userId");
    if(!userId) {
      userId = await Spotify.getUser();
      window.localStorage.setItem("userId", userId);
    }

    const trackUris = trackList.map(track => track.uri);
    const playlistSaveResult = await Spotify.savePlaylist(userId, trackUris, playlistName);
    if(playlistSaveResult) {
      // set success to true only for 2 seconds
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setPlaylistName("New Playlist");
        setTrackList([]);
        setSearchResults([]);
      }, 2000);
    } else {
      setErrors(["Something went wrong. Please try again."]);
      setSuccess(false);
    }
  }

  // Function to log out
  const logout = () => {
    window.localStorage.removeItem("token");
    setAccessToken("");
  };

  return (
    <div className="App">
      <header className="App-header bg-green">
        <h1>
          Ja<span className="text-yellow font-weight-bold">mmm</span>ing
        </h1>
        {accessToken && (<Button className="logout_button" variant='outline-yellow' onClick={logout}><LogoutIcon/><span className="m-6">Logout</span></Button>)}
      </header>
      <main className="App-body">
      {!accessToken ? (
        <Login url={authentication_endpoint} />
      ) : (
        <>
        <SearchBar handleSearchSubmit={handleSearchSubmit} />
        <div className="container">
          <div className="row gx-5">
            <div className="column_container col bg-green p-0">
              <SearchResults
                searchResults={searchResults}
                handleAddTrack={handleAddTrack}
              />
            </div>
            <div className="column_container col bg-green p-0">
              <Playlist
                success={success}
                errors={errors}
                trackList={trackList}
                playlistName={playlistName}
                handleRemoveTrack={handleRemoveTrack}
                handleNameChange={handleNameChange}
                handleSavePlaylist={handleSavePlaylist}
              />
            </div>
          </div>
        </div>
        </>
      )}      
      </main>
    </div>
  );
}

export default App;
