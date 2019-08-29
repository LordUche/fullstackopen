import React from 'react';
import Person from './Person';

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </>
  );
};

export default Persons;
