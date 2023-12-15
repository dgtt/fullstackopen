const Header = (props) => {
  console.log(props)
  const course = props.course 
  return (
    <div>
      <p>
        Nombre del curso: {course.name}
      </p>
    </div>
  )
}

const Content  = (props) => {
  console.log(props)

  const arrValores=props.parts;

  return (
    <div>
      <p>
        Partes: {arrValores[0].name}, ejercicios: {arrValores[0].exercises}
      </p>
      <p>
        Partes: {arrValores[1].name}, ejercicios: {arrValores[1].exercises}
      </p>
      <p>
        Partes: {arrValores[2].name}, ejercicios: {arrValores[2].exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Total ejercicios:{props.total}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <>
  
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises}/>
    </>
  )
}



export default App