const express = require('express');
const app = express();
const bookRouter = require('./routes/bookRouter');
const globalErrorHandler = require('./controllers/errorController');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Set security HTTP headers
app.use(helmet());

// Development Logging
app.use(morgan('dev'))

// Rate Limiter
const limiter = rateLimit({ // Used to prevent DOS and BruteForce Attacks
    max: 100,
    windowMs: 60*60*1000, // Time window in ms
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json());

// Data Sanitaztion against nosql injections
app.use(mongoSanitize());

// Data Sanitaztion against XSS (cross site scripting)
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));

// To serve static files
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/', bookRouter);

app.use(globalErrorHandler);

module.exports = app;