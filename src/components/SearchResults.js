import React from 'react';
import Track from './Track';

const SearchResults = ({searchResults, handleAddTrack}) => {
    return (
        <div className="search-results column">
            <h2>Results</h2>
            {searchResults.map(result => <Track track={result} handleAddTrack={handleAddTrack} buttonMethod={'add'}/>)}
        </div>
    )
}

export default SearchResults;