const Book = require('../models/bookModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllBooks = catchAsync(async(req, res)=>{ //Add filtering

    let queryObj = {...req.query}
    delete queryObj['fields'];

    let queryStr = JSON.stringify(queryObj);
    //Removing mongoose queries to avoid sqlInjection attacks
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, match => `$${match}`);

    let query = Book.find(JSON.parse(queryStr));

    //Field limiting or Filtering
    if(req.query.fields){
        let fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }
    else{
        query = query.select('-__v'); 
    }

    let books = await query //execute the query

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
        date: {
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