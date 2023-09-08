import React from 'react';
import { useState } from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <button className="search-button">SEARCH</button>
    </div>
  )
};

export default SearchBar;