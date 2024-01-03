const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')


//Permite cors para todos los orígenes
app.use(cors())
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

/////////////////////////////////////////////////////////////////

let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123456',
    id: 1
  },
  {
    name: 'asdasd',
    phone: '12312',
    id: 6
  },
  {
    name: 'asd',
    phone: 'asd',
    id: 7
  },
  {
    name: 'asasd',
    phone: 'asdasd',
    id: 8
  }
];

app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(500).json({ error: 'Something went wrong!' });
});

app.use(express.json());

// My Routers:
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({
      error: `Person id ${id} not found`
    });
  }
});

app.get('/info', (request, response) => {
  const cantidad = persons.length;
  const currentDate = new Date().toString();

  console.log('Cantidad personas', cantidad);
  response.setHeader('Content-Type', 'text/html');
  response.send(`Phonebook has info for ${cantidad} people <br>Request Date: ${currentDate}`);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

// Function to generate automatic id
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0;
  return maxId + 1;
};

// POST
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'Falta el nombre o número'
    });
  }

  const personExists = persons.find(person => person.name === body.name);
  if (personExists) {
    return response.status(400).json({
      error: `Nombre ya existe en agenda: ${body.name}`
    });
  }

  const person = {
    name: body.name,
    phone: body.phone,
    id: generateId()
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
