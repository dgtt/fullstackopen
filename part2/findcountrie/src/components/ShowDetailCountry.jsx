import React, {useState, useEffect} from 'react';
import GetWeather from './GetWeather';


const ShowDetailCountry = ({ country }) => {
    console.log('Entrando al detalle del país', country)
    //obtenemos la api key
    const [apiKey, setApiKey] = useState('');
    /*
    useEffect(() => {
        const fetchApiKey = async () => {
          const response = await fetch('/.env');
          const text = await response.text();
          const lines = text.split('\n');
          const keyLine = lines.find(line => line.startsWith('VITE_REACT_APP_API_KEY'));
          const key = keyLine.split('=')[1].trim();
          setApiKey(key);
        };
    
        fetchApiKey();
      }, []);
    */    
    return(
        <div>
        <h2>Country</h2>
        <strong>Name</strong>
        <ul>       
            <li key={country.cca3}>
                <h1>{country.name && country.name.common}</h1> 
                <br />
                Capital: {country.capital && country.capital[0]}<br />
                Population: {country.population} 
                <h2>Languajes</h2>
                <ul>
                {Object.values(country.languages).map((language, index) => (
                        <li key = {index}>
                            {language}
                        </li>
                    ))}
                </ul>
                <div>
                    <img 
                        src={country.flags && country.flags.png} 
                        alt={`Flag of ${country.name && country.name.common}`} 
                        style={{ width: '100px', height: 'auto' }}  // Adjust the width as needed
                    />
                </div>   
                <div>
                   <GetWeather country={country.name.common} />
                </div>
            </li>

        </ul>
        </div>    
    )
}
export default ShowDetailCountry;