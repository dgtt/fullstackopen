import { useState, useEffect } from 'react'
import axios from 'axios'
import FilteredCountrieList from './components/FilteredCountrieList';


function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ filterName, setFilterName ] = useState('')
  //Poblamos base inicial desde la bd
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  //Eventos:
  const handleFilterChange = (event)=>{
    setFilterName(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={filterName} onChange={handleFilterChange} />
      </div>
      <div>
        <FilteredCountrieList
        countries={countries}
        filterName={filterName}
        />
      </div>
    </div>
  )
}

export default App
