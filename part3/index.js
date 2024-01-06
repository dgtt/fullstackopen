require('dotenv').config()
const express   = require('express');
const morgan    = require('morgan');
const app       = express();
const cors      = require('cors')
const mongoose  = require('mongoose')
const Person    = require('./models/person');
//const person = require('./models/person');
const url = process.env.MONGODB_URI

//Permite cors para todos los orígenes
app.use(express.json());
app.use(cors())

/************************* Routings ***************************
 *************************************************************/

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons=>{
      response.json(persons)
    })
    .catch(error=>{
      console.error('Error al traer todas las personas', error)
      response.status(500).json({ error: 'Something went wrong!' });
    })
  })

app.get('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id);
  //const person = Person.find(person => person.id === id);
  const person = Person.find({ id : id})
    .then(person=>{
      console.log(`Persona encontrada (${person.length})`, person)
      if (person.length>0){
        response.json(person)
      } else {
        response.status(404).json({
          error: `Person id ${id} not found`
        });
      }
    })
    .catch(error=> next(error));
    
});

app.get('/info', async (request, response) => {
  const cantidad = await Person.countDocuments({})    
  const currentDate = new Date().toString();

  console.log('Cantidad personas', cantidad);
  response.setHeader('Content-Type', 'text/html');
  response.send(`Phonebook has info for ${cantidad} people <br>Request Date: ${currentDate}`);
  
});

app.delete('/api/persons/:id', async (request, response) => {
  const id = Number(request.params.id);
  const deletedPerson= await Person.findOneAndDelete({id : id})
    .then(deletedPerson=>{
      console.log('Resultado eliminar', deletedPerson)
      if (deletedPerson){
        response.status(204).end()
      } else {
        response.status(404).json({
          error: `Person id ${id} not found`
        });
      }
    })
    .catch (error=>{
      console.error('Error deleting person', error)
      response.status(500).json({ error: 'Error general al tratar de borrar a la persona!' });
    })
});

app.post('/api/persons', async (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'Name or phone number is missing'
    });
  }

  try {
    const newId = await generateId();
    const person = new Person({
      name: body.name,
      phone: body.phone,
      id: newId
    });
    //Buscamos si la persona existe con el nombre. De ser así, actualizamos:
    /*const existingPerson = Person.findOne ({name: body.name})
      .then(existingPerson=>{
        if (existingPerson){
          //como existe en base al nombre, actualizamos
          existingPerson.phone=body.phone
          const updatedPerson =  existingPerson.save()
          .then (updatedPerson=>{
            response.json(updatedPerson);
          })
          .catch(error=> next(error));
        } else {
          //es nuevo (no existe por nombre), por tanto se crea*/
          const savedPerson = person.save()
          .then (savedPerson=>{
            console.log('Person saved with ID:', savedPerson.id);
            response.json(savedPerson);        
          })
          .catch(error=> next(error));
     /*   }
      })*/
      //.catch(error=> next(error));
  } catch (error) {
    console.error('Error creating person:', error);
    response.status(500).json({ error: 'Something went wrong!' });
  }
});

const generateId = async () => {
  try {
    const result = await Person.findOne({}, { id: 1 }).sort({ id: -1 }).exec();

    if (result) {
      return result.id + 1;
    } else {
      return 1;
    }
  } catch (error) {
    console.error('Error finding max ID:', error);
    throw error;
  }
};

app.put('/api/persons/:id', (request, response, next)=>{
  const id = Number(request.params.id);
  const body = request.body;

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'Name or phone number is missing'
    });
  } else {
    const existingPerson = Person.findOne ({id: id})
    .then (existingPerson=>{
      console.log('Persona encontrada para actualizar', existingPerson)
      if (existingPerson){
        existingPerson.phone = body.phone
        existingPerson.name  = body.name
        const updatedPerson =  existingPerson.save()
        .then (updatedPerson=>{
          response.json(updatedPerson);
        })
          .catch(error=> next(error));
      } else {
        // la persona no existe
        const error = new Error ('Persona no existe, no se puede actualizar')
        error.status=404;
        throw error;
      }
    })
    .catch(error=> next(error));
  }
})
/************************* End Routings **********************
 *************************************************************/
/************************* User Functions ********************
 *************************************************************/

/************************* End User Functions *****************
 *************************************************************/

/************************* MiddlesWare************************
 *************************************************************/
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
  
// Middleware to parse JSON in the request body
app.use(express.json());

// Custom morgan token for request body
morgan.token('reqBody', (req) => JSON.stringify(req.body) || '-');

//para buscar statics de producción
app.use(express.static('dist'))

// Middleware for logging requests
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqBody',
    {
      stream: {
        write: (message) => console.log(message.trim())
      }
    }
  )
);
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError' && error.errors.name.kind === 'unique') {
    // Handle duplicate name error
    return response.status(400).json({ error: 'Name must be unique' });
  } else {
    return response.status(500).json({ error: error.message });
  }
  next(error)
}
app.use(errorHandler)

/************************* End MiddlesWare *******************
 *************************************************************/

/************************* Finnally************************
 *************************************************************/
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/************************* End Finnaly ***********************
 *************************************************************/
