import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const SearchBar = ({handleSearchSubmit}) => {
  const [searchInput, setSearchInput] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    handleSearchSubmit(searchInput);
    setSearchInput('');
  }
  
  return (
    <Form className="search_form" onSubmit={onSubmitHandler}>
          <div className='search_form_inner'>
            <div className='input_group'>
              <Form.Label htmlFor="song">Search songs on Spotify</Form.Label>
              <Form.Control id="song" type="text" placeholder="Enter A Song, Album, or Artist" onChange={(event) => setSearchInput(event.target.value)} value={searchInput}/>
            </div>
          <Button className="SearchButton" variant="darkgreen" type="submit">
            Search
          </Button>
          </div>
    </Form>
  )
};

export default SearchBar;