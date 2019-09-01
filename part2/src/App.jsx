/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import personService from './services/persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);

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
        confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        let existingPerson;
        existingPerson = { ...persons.find(person => person.name === newName) };
        return personService
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(
              persons.map(person =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setMessage({
              text: `Information of ${existingPerson.name} has already been removed from server`,
              type: 'error',
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter(person => person.name !== newName))
          });
      }
    }
    return personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
        setMessage({ text: `Added ${person.name}`, type: 'success' });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const handleDeletePerson = personToDelete => {
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

      <Notification message={message} />

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
