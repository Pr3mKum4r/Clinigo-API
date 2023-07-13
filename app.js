const express = require('express');
const app = express();
const bookRouter = require('./routes/bookRouter');


//body parser
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/', bookRouter);

module.exports = app;