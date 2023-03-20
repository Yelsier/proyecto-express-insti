const express = require('express');

const app = express();
const port = 8080;

app.get('/api/hello', (req, res) => {
    res.json({ hello: 'Hello World!' });
})

app.use(express.static('public/'));

app.listen(port);
console.log('Server started at http://localhost:' + port);
