import React from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
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
      <Row className='align-items-center justify-content-center gap-3'>
        <Col md="6" xs="12">
          <Form.Control type="text" placeholder="Enter A Song, Album, or Artist" onChange={(event) => setSearchInput(event.target.value)} value={searchInput}/>
        </Col>
        <Col md="1" xs="12">         
          <Button variant="darkgreen" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
};

export default SearchBar;