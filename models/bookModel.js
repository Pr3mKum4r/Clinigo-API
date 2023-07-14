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
    genre: {
        type: String,
        required: [true, 'A book must have a genre']
    },
    year: {
        type: Number,
        required: [true, 'A book must have the year of release']
    },
    rating: {
        type: Number,
        required: [true, 'A book must have a rating'],
        min: [0, 'Rating must be minimum 0'],
        max: [5, 'Rating must be maximum 5']
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;