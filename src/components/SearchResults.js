import React from 'react';
import Track from './Track';

const SearchResults = ({searchResults, handleAddTrack}) => {
    return (
        <div className="search-results column m-2">
            <h2 className="pb-3">Results</h2>
            {!searchResults && <p className="text-center p-4">Search for songs, albums or artists to see tracks</p>}
            {searchResults && searchResults.map(result => <Track key={result.id} track={result} handleAddTrack={handleAddTrack} buttonMethod={'add'}/>)}
        </div>
    )
}

export default SearchResults;