const express = require('express');
const dotenv = require("dotenv")
dotenv.config()

const tickets = require('./routes/tickets');
const flights = require('./routes/flights');
const boardingPasses = require('./routes/boardingPasses');

const app = express();
const port = 8080;

app.use(express.static('public/'));
app.use('/api/tickets', tickets)
app.use('/api/flights', flights)
app.use('/api/boarding_passes', boardingPasses)

app.listen(port);
console.log('Server started at http://localhost:' + port);
