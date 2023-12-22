import React, { useState, useEffect } from 'react';
import PersonDB from '../services/PersonDB';
import '../index.css'

//Creamos componente para listar todos los nombres
const PersonList = ({persons, setPersons})=>{
  const [errorMessage, setErrorMessage] = useState(null)


    //función para eliminar
    const handleDelete = async (id, name) => {
      const confirmDeletion = window.confirm(`Delete ${name}?`);

      if (confirmDeletion) {
        try {
          // Call the delete method
          await PersonDB.deletePerson(id);
          setPersons((prevPersons) => prevPersons.filter((person) => person.id !== id));
        

          // Optional: Display a success message
          alert(`${name} has been deleted from the phonebook`);
        } catch (error) {
          console.error('Error deleting person:', error);
          setErrorMessage(
            `'Error deleting person:'${error} `
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
    };  
    return (
      <ul>
        {persons.map((person,index)=>
          <li key= {index}>{person.name} {person.phone}
          <button onClick={() => handleDelete(person.id, person.name)} >Delete</button>
          </li>
          
        )}
        
      </ul>
    )
  }

export default PersonList;