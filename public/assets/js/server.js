const express = require('express');
const path = require('path');
const db = require('../../../db/db.json');
const fs = require('fs');
const shortid = require('shortid');
var appPORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));
app.get('/api/notes', (req, res) => res.json(db))
app.post('/api/notes', (req, res) => {
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
    }
    db.push(note);
    fs.writeFileSync('../../../db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
        return res.json(db);
    });
});

app.listen(appPORT, () => console.log(`App listening on PORT ${appPORT}`));