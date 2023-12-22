import React, {useState} from 'react';
import ShowDetailCountry from './ShowDetailCountry';

  //Creamos componente para listar los nombres filtrados
  const FilteredCountrieList = ({ countries, filterName }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    console.log('Entrando al filtro',filterName,countries)
    if (filterName!='') {
        const filteredCountries = countries.filter((country) => 
            country.name && country.name.common.toLowerCase().includes(filterName.toLowerCase())
        );
        console.log('resultado filtro',filteredCountries)
        if ( filteredCountries.length == 0) {
            return ("Sin datos")
        } else if ( filteredCountries.length == 1) {
            return (
                <ShowDetailCountry
                country={filteredCountries[0]}
                />
            )
        } else {
            return(
                <div>
                <h2>Country List</h2>
                <strong>Name</strong>
                <ul>
                {filteredCountries.map(country => (
                    <li key={country.cca3}>
                        {country.name && country.name.common}
                        <button onClick={() => setSelectedCountry(country)}>Show</button>                    
                        <br />
                    </li>
                ))}
                </ul>
                {selectedCountry && (
                    <ShowDetailCountry country={selectedCountry} />
                )}
                </div>
            )        
        }
    } 

  };

export default FilteredCountrieList;