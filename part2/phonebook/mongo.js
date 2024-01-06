import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const vName = process.argv[3];
const vPhone = process.argv[4];

const url = `mongodb+srv://dgt1700:${password}@cluster0.hm9metu.mongodb.net/phone-app?retryWrites=true&w=majority`;

// Define Person model using personSchema
const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  id: BigInt,
});

const Person = mongoose.model('Person', personSchema);


if (vName && vPhone){
    //creamos al usuario enviado por parámetro 
    mongoose.connect(url)
    .then(() => {
      console.log('Connected to MongoDB');
      
      const person = new Person({
        name: vName,
        phone: vPhone,
        id: BigInt(69), // Set the appropriate value for id
      });
  
      // Save the person
      return person.save();
    })
    .then(result => {
      console.log(`added ${vName} ${vPhone} to phonebook:`, result);
    })
    .then(() => {
      console.log('Connection closed');
        // Close the connection
        return mongoose.connection.close();
    })
    .catch(error => {
      console.error('Error:', error);
    });
} else {
    //mostramos toda la agenda en el log
    mongoose.connect(url)
    .then(() => {
      // Find all persons
      return Person.find({});
    })
    .then(result => {
      console.log('All persons:');
      result.forEach(person => {
        console.log(person);
      });
  
      // Close the connection
      return mongoose.connection.close();
    })
    .then(() => {
      console.log('Connection closed');
    })
    .catch(error => {
      console.error('Error:', error);
    });    
}


