const express = require('express')
var PORT = process.env.PORT || 3001;

const app = express()

app.get('/public/notes.html')