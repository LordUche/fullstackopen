import React from 'react';
import Person from './Person';

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <>
      {persons.map(person => (
        <div key={person.id}>
          <Person name={person.name} number={person.number} />
          <button onClick={() => onDeletePerson(person)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
