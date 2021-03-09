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

const dbFilePath = path.join(__dirname, 'db', 'db.json');

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));

// Displays all notes
app.get('/api/notes', (req, res) => {
    res.header("Content-Type", 'application/json');
    res.sendFile(dbFilePath);
})

// All other route inputs direct to the index page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));


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