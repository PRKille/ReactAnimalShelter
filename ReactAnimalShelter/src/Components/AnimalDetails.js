import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Button.css';

function AnimalDetails(props) {
  const { match: { params } } = props;
  const [ loadedState, setLoadedState ] = useState(false);
  const [ animalState, setAnimalState ] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/Cats/${params.animalId}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonifiedResponse) => {
        setAnimalState(jsonifiedResponse);
        setLoadedState(true);
      })
      .catch((error) => {
        console.log('Animal Shelter Error => ', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-center"> Animal Details </h1>
      <p> {params.animalId} </p>
      <p> Name: {animalState.name}</p>
      <p> Breed: {animalState.breed}</p>
      <p> Age: {animalState.age}</p>
      <p> Gender: {animalState.gender}</p>
      <Link to={`/edit/${params.animalId}`}>
        <button className="button">Edit</button>
      </Link>
    </Container>
  );
}

AnimalDetails.propTypes = {};

export default AnimalDetails;
