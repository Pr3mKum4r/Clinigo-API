const express = require('express');
const app = express();
const bookController = require('../controllers/bookController');

const router = express.Router();

app.use('/', router);

router.get('/', (req, res)=>{
    res.send('Welcome To the ClinigoAPI');
})
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBook);
router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;

