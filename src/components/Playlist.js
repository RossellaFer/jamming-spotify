import React from 'react';
import Track from './Track';
import Button from 'react-bootstrap/Button';

const Playlist = ({trackList, playlistName, handleRemoveTrack, handleNameChange, handleSavePlaylist, errors, success }) => {
    return(
        <div className="playlist column m-2">
            <input className="text-black mb-4" defaultValue={playlistName} onChange={handleNameChange}/>
            {trackList.map(track => <Track key={track.id} track={track} handleRemoveTrack={handleRemoveTrack} buttonMethod={'remove'}/>)}
            {errors.length > 0 && <div className="alert alert-danger">{errors[0]}</div>}

            {success ? (<div className="alert alert-success">Playlist saved successfully!</div>) : (<Button onClick={handleSavePlaylist} variant="yellow" className='px-3 py-2 border-black m-4'>SAVE TO SPOTIFY</Button>)}
        </div>
    )
}

export default Playlist;
