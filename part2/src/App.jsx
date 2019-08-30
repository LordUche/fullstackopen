import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

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

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some(person => person.name === newName)) {
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        let existingPerson;
        existingPerson = { ...persons.find(person => person.name === newName) };
        return personService
          .update(existingPerson.id, { ...existingPerson, ...newPerson })
          .then(updatedPerson => {
            setPersons(
              persons.map(person =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
          });
      }
    }
    return personService
      .create({ ...newPerson, id: persons.length + 1 })
      .then(person => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      });
  };

  const handleDeletePerson = personToDelete => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Delete ${personToDelete.name}?`))
      personService
        .deletePerson(personToDelete.id)
        .then(() =>
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        );
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

      <Persons persons={personsToShow} onDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
