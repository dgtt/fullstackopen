import React from 'react';
import PersonList from './PersonList';

  //Creamos componente para listar los nombres filtrados
  const FilteredPersonList = ({ persons, filterName, setPersons, setErrorMessage }) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    );
  
    return <PersonList persons={filteredPersons} setPersons={setPersons} setErrorMessage={setErrorMessage} />;
  };

export default FilteredPersonList;