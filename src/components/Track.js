import React from "react";

const Track = ({ track, handleAddTrack, handleRemoveTrack, buttonMethod }) => {
    
    return (
        <div className="result" key={track.id}>
            <div className="result-info">
                <h3>{track.title}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>

            <div className="result-actions">
                {buttonMethod === 'add' ? <button className="add-button" onClick={() => handleAddTrack(track)}>+</button> : <button className="remove-button" onClick={() => handleRemoveTrack(track.id)}>-</button>
                }
            </div>
        </div>
    );
}

export default Track;