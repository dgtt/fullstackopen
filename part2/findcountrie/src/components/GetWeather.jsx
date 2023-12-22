import React, { useEffect, useState } from 'react';

const GetWeather = (country) => {
  console.log('Buscando tiempo',country)
  const [weatherData, setWeatherData] = useState(null);
  const accessKey = 'cabe39a687bf7c7a3a4e7d1ef19b0980'; // Replace with your actual API key
  const query = country.country; // Replace with the desired location

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setWeatherData(result);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [accessKey, query]);
  console.log ('request tiempo',`http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}`)
  console.log ('respuesta tiempo',weatherData)
  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temperature} °C</p>
          <p>Weather description: {weatherData.current.weather_descriptions[0]}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default GetWeather;
