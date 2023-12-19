import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

// un lugar adecuado para definir un componente
const Statistics = (props) => {
 console.log(props)

  if ((props.datos.good+props.datos.neutral+props.datos.bad)==0) {
    return (
      <h2>No Feedback given</h2>
    )  
  } else {
    return (
      <div>
        <table>
          <tr>
            <td>Good</td>
            <td><StatisticLine text="Good" value ={props.datos.good}/></td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td><StatisticLine text="neutral" value ={props.datos.neutral}/></td>
          </tr>
          <tr>
            <td>Bad</td>
            <td><StatisticLine text="Bad" value ={props.datos.bad}/></td>
          </tr>
          <tr>
            <td>All</td>
            <td><StatisticLine text="All" value ={props.datos.good+props.datos.neutral+props.datos.bad}/></td>
          </tr>
          <tr>
            <td>Average</td>
            <td><StatisticLine text="Average" value ={(props.datos.good+props.datos.neutral+props.datos.bad)/3}/></td>
          </tr>
          <tr>
            <td>Positive</td>
            <td><StatisticLine text="Positive" value ={props.datos.good/props.datos.bad}/></td>
          </tr>
        </table>
       </div>       
    )    
  }
    
}

const StatisticLine = (props)=>{
  console.log(props)
  return(
    props.value
    )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const datos = {
    good: good,
    neutral: neutral,
    bad:bad 
  }

  const setToValueGood = newValue => {
    console.log('value now', newValue)
    setGood(newValue)
  }
  const setToValueNeutral = newValue => {
    console.log('value now', newValue)
    setNeutral(newValue)
  }
  const setToValueBad = newValue => {
    console.log('value now', newValue)
    setBad(newValue)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToValueGood(good + 1)} text="good" />
      <Button handleClick={() => setToValueNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToValueBad(bad + 1)} text="bad" />
      <p>Statistics</p>
      <Statistics datos={datos} />
    </div>
  )
}




export default App