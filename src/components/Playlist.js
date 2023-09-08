import React from 'react';
import Track from './Track';

const Playlist = ({trackList, playlistName, handleRemoveTrack, handleNameChange }) => {
    return(
        <div className="playlist column">
            <input defaultValue={playlistName} onChange={handleNameChange}/>
            {trackList.map(track => <Track key={track.id} track={track} handleRemoveTrack={handleRemoveTrack} buttonMethod={'remove'}/>)}
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;
