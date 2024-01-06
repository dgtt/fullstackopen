const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://dgt1700:${password}@cluster0.hm9metu.mongodb.net/note-app?retryWrites=true&w=majority`;

// Define Note model outside the callback function
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');

    const note = new Note({
      content: 'chamelfo!',
      date: new Date(),
      important: false,
    });

    // Save the note
    return note.save();
  })
  .then(result => {
    console.log('Note saved:', result);
  })
  .then(() => {
    // Find all notes
    return Note.find({});
  })
  .then(result => {
    console.log('All notes:');
    result.forEach(note => {
      console.log(note);
    });
  })
  .then(() => {
    // Find important notes
    return Note.find({ important: false });
  })
  .then(result => {
    console.log('Important notes:');
    result.forEach(note => {
      console.log(note);
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
