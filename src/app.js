const express = require('express');
const authorsRouter = require('./routes/authors');

const app = express();

app.use(express.json());

app.use('/authors', authorsRouter);

app.get('/', function(req, res) {
    res.json({ mensaje: 'API MiniBlog funcionando' });
});

module.exports = app;