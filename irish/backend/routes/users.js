var express = require('express');
var router = express.Router();
var user=require('../controller/user')

router.post('/insert_books',user.insertBooks)
router.get('/get_books',user.getBooks)
router.put('/update_books/:id',user.updateBooks)
router.get('/delete_books/:id',user.deleteBooks)
router.get('/search_books',user.bookSearch)
router.get('/books_pagination',user.bookPagination)

module.exports = router;


