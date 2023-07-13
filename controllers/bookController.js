const mongoose = require('mongoose');
const Book = require('../models/bookModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllBooks = catchAsync(async(req, res)=>{ //Add filtering
    const books = await Book.find()

    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            books
        }
    })
});

exports.getBook = catchAsync(async(req, res, next)=>{
    const book = await Book.find(req.params.id);

    if(!book){
        return next(new AppError('No Book Found with the given ID!'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
}); 

exports.createBook = catchAsync(async(req, res, next)=>{
    const newBook = await Book.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        rating: req.body.rating
    })

    res.status(201).json({
        status: 'success',
        data:{
            newBook
        }
    })
});