const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'A book must have a title'],
        unique: true
    },
    author:{
        type: String,
        required: [true, 'A book must have an author'],
    },
    genre: String,
    year: {
        type: Number,
        required: [true, 'A book must have the year of release']
    },
    rating: Number
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;