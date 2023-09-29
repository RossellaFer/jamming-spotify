import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Track = ({ track, handleAddTrack, handleRemoveTrack, buttonMethod }) => {
    
    return (
        <Card className="result d-flex p-2 flex-row align-items-center mb-4" key={track.id}>
            <Card.Body className="col">
                <Card.Title as="h3" className="text-start pb-2 mb-3 border-bottom border-darkgreen text-darkgreen">{track.name}</Card.Title>
                <Card.Subtitle className="text-start pb-1">Artist: {track.artist}</Card.Subtitle>
                <Card.Subtitle className="text-start">Album: {track.album}</Card.Subtitle>
                {track.preview_url != null && (
                    <div className="track-preview"><span>Preview: </span> 
                    <audio src={track.preview_url} controls />
                    </div>
                )}
            </Card.Body>
            <Card.Link className="col-2">
                {buttonMethod === 'add' ? <Button className="add_button" variant="darkgreen" onClick={() => handleAddTrack(track)}>+</Button> : <Button className="remove_button" variant="outline-darkgreen" onClick={() => handleRemoveTrack(track.id)}> - </Button>}
            </Card.Link>
        </Card>
    );
}

export default Track;