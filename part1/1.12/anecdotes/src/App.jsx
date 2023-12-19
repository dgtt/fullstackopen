import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  //objeto para almacenar votación de respuestas
  const initialPoints = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
  const [points, setPoints] = useState(initialPoints);

  const buscaAnecdota = () => {
    console.log('Nueva anecdota')
    const arrayLength = anecdotes.length;
    const randonNumber= Math.round(Math.random() * (arrayLength - 0) + 0);
    console.log('Número ramdom:' , randonNumber)
    setSelected(randonNumber)
  }
  const AnecdotaMasVotada=()=>{
    console.log('La más votada')
    const valuesArray = Object.values(points);
    const maxPoints = Math.max(...valuesArray);
    // Find the index of the anecdote with the most votes
    const indexOfMaxPoints = Object.keys(points).find(key => points[key] === maxPoints);
    const mostVotedAnecdote = anecdotes[indexOfMaxPoints];

    return mostVotedAnecdote;
  }
  const votar =()=>{
    //falta hacer que se modifique el objeto points
    console.log('votando..')
   // Create a copy of the points object using the spread operator
   const updatedPoints = { ...points };
   // Increment the value of the selected anecdote
   updatedPoints[selected] += 1;
   // Update the state with the new points
   setPoints(updatedPoints);
    }
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <li>{anecdotes[selected]}</li>
      <li>has {points[selected]} votes</li>

      <p></p>
      <Button handleClick={() => votar()} text="vote" />
      <Button handleClick={() => buscaAnecdota()} text="next anecdotes" />
      <p></p>
      <li>Anecdotes with most votes</li>
      <AnecdotaMasVotada/>
    </div>
  )
}

export default App