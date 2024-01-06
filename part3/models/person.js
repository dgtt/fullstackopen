const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
name: {
  type: String,
  unique: true,
  required: true,
  minlength: 3
},
phone: {
  type: String,
  minlength: 8
},
id: Number,
});

personSchema.plugin(uniqueValidator);
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id

    /*returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v*/
  }
})


module.exports = mongoose.model('Person', personSchema)