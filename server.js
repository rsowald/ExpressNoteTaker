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

// Static file paths
const dbFilePath = path.join(__dirname, 'db', 'db.json');
const notesHtmlPath = path.join(__dirname, 'public', 'notes.html');
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');

// Routes

// Serving assets statically
app.use(express.static("assets"));

// Returns all notes
app.get('/api/notes', (req, res) => {
    res.header("Content-Type", 'application/json');
    res.sendFile(dbFilePath);
});

// Basic route that sends the user to the notes page
app.get('/notes', (req, res) => res.sendFile(notesHtmlPath));

// All other routes direct to the index page
app.get('*', (req, res) => res.sendFile(indexHtmlPath));

app.post('/api/notes', (req, res) => {
    //TODO: validate req
    //TODO: unique id

    const notesText = fs.readFileSync(dbFilePath);
    const notes = JSON.parse(notesText);
    notes.push(req.body);
    const updatedNotes = JSON.stringify(notes, null, '\t');
    try {
        fs.writeFileSync(dbFilePath, updatedNotes);
    } catch (error) {
        console.log(error);
    }
    console.log('Note added!');
    res.json(req.body);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));