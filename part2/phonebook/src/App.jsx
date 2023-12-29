import React, { useState, useEffect } from 'react'
import PersonList from './components/PersonList';
import FilteredPersonList from './components/FilteredPersonList';
import PersonFormulary from './components/PersonFormulary';
import axios from 'axios'
import PersonDB from './services/PersonDB';
import './index.css'
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)



  //Poblamos base inicial desde la bd
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3000/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  //Agregamos componente para agregar nombres a la agenda
  const addName = async  (event)=>{
    console.log('Entrando addName',event)
    event.preventDefault()
    //validamos que la persona no exista en el objeto persons
    const existingPerson = persons.find((person) => person.name === newName);

    
    if (existingPerson){
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook. Do you want update the phone?`);
      if (confirmUpdate) {
        try {
          // Call the update method
          await PersonDB.update(existingPerson.id, {
            ...existingPerson,
            phone: newPhone,
          });
          // Update the state with the updated person
          setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === existingPerson.id
              ? { ...person, phone: newPhone }
              : person
          ));
        

          // Optional: Display a success message
          //alert(`${newName} has been updated from the phonebook`);
          setErrorMessage(
            `${newName} has been updated from the phonebook`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        } catch (error) {
          console.error('Error updating person:', error);
        }
      }
      

      
    } else {
      const nameObject ={
        name: newName,
        phone:newPhone
      }
      setPersons([...persons,nameObject])
      setNewName('')
      //todo: almacenar en la json-server
      try {
        // Call the create method to add a new person
        const createdPerson = await PersonDB.create(nameObject);
        // Update the state with the new person
        setPersons([...persons, createdPerson]);
        // Clear the input fields
        setNewName('');
        setNewPhone('');
        // Optional: Display a success message
        
        setErrorMessage(
          `${newName} has been added to the phonebook`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      } catch (error) {
        console.error('Error creating person:', error);
      }   
    }
  }
  
  //Agregamos evento para botón add
  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event)=>{
    setNewPhone(event.target.value)
  }
  const handleFilterChange = (event)=>{
    setFilterName(event.target.value)
  }
  const handlePersonChange = (event)=>{
    setPersons(event.target.value)
  }
  
  
  return (
    <div>
      <h2>Phonebook</h2>
       {/* Display error message */}
       <Notification message={errorMessage}/>
      <div>
        filter show with <input value={filterName} onChange={handleFilterChange} />
      </div>
      <PersonFormulary
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <FilteredPersonList persons={persons} filterName={filterName} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App