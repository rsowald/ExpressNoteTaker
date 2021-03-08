// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

// Displays all notes
app.get('/api/notes', (req, res) => res.json(path.join(__dirname, 'db', 'db.json')));

// All other route inputs direct to the index page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFile(path.join(__dirname, 'db', 'db.json')));
    notes.push(req.body);
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes, null, '\t'), (err) =>
        err ? console.log(err) : console.log('Note added!'));
    res.json(req.body);
});




// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));