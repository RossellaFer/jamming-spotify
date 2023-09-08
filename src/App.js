import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import tracks from './data/tracks';


function App() {
  const [searchResults, setSearchResults] = useState(tracks);
  const [trackList, setTrackList] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  function handleAddTrack(track) {
    if (trackList.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setTrackList([...trackList, track]);
  }

  function handleRemoveTrack(id) {
    setTrackList(trackList.filter(track => track.id !== id));
  } 

  function handleNameChange(e) {
    const name = e.target.value;
    setPlaylistName(name);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>
      <div className="App-body">
        <SearchBar />
        <div className="container">
          <SearchResults searchResults={searchResults} handleAddTrack={handleAddTrack}/>
          <Playlist 
            trackList={trackList} 
            playlistName={playlistName}
            handleRemoveTrack={handleRemoveTrack} 
            handleNameChange={handleNameChange}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
