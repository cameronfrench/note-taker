const express = require('express');
const path = require('path');
const PORT = process.env.PORT ?? 3001;
const app = express();
const uuid = require('./helpers/uuid');
const fs = require('fs');



app.use(express.static('public'));

// Middleware for parsing application/json
app.use(express.json());
// `urlencoded` data represents a URL encoded form.
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/notes', (req, res) => {
  return res.sendFile(path.join(__dirname, '/views/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const original = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(original);
  return res.json(notes)
});

// POST request to add a new note
app.post('/api/notes', (req, res) => {
  console.log(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {

    // Creates a new note object
    const newNote = {
      title,
      text,
      review_id: uuid(),
    };

    let original = fs.readFileSync('./db/db.json', 'utf8');
    const notes = JSON.parse(original);
    notes.push(newNote);


    // Converts the data to a string so we can save it
    const noteString = JSON.stringify(notes, null, 2);

    // Writes the string to the db.json file
    fs.writeFileSync(`./db/db.json`, noteString);

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding note');
  }
});

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '/views/notes.html'));
});

app.listen(PORT, () => {
  console.log(`Application is running @ http://localhost:${PORT}`);
}); 