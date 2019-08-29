import React, { useState } from 'react';
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');
  const [showAll, setShowAll] = useState(true);

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchString.toLowerCase())
      );

  const handleNewNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleSearchStringChange = e => {
    setSearchString(e.target.value);
    if (searchString) setShowAll(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchString={searchString} onChange={handleSearchStringChange} />

      <h3>Add a new</h3>

      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
        onSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
