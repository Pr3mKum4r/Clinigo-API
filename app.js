const express = require('express');
const app = express();
const bookRouter = require('./routes/bookRouter');
const globalErrorHandler = require('./controllers/errorController');

//body parser
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/', bookRouter);

app.use(globalErrorHandler);

module.exports = app;