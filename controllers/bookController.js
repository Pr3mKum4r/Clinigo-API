const Book = require('../models/bookModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllBooks = catchAsync(async(req, res)=>{ //Add filtering

    const features = new APIFeatures(Book.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    let books = await features.query //execute the query

    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            books
        }
    })
});

exports.getBook = catchAsync(async(req, res, next)=>{
    const book = await Book.findById(req.params.id);

    if(!book){
        return next(new AppError('No Book Found with the given ID!'), 404);
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

exports.updateBook = catchAsync(async(req, res, next)=>{
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!book){
        return next(new AppError('No book found with the given ID!'));
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
});

exports.deleteBook = catchAsync(async(req, res, next)=>{
    const book = await Book.findByIdAndDelete(req.params.id);

    if(!book){
        return next(new AppError('No Book Found with the given ID!'), 404);
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
});