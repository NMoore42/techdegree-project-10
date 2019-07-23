const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

//Books route -> shows index of all books
router.get('/', (req, res, next) => {
  Book.findAll({order: [["title", "ASC"]]})
    .then( books => {
      res.render('books/index', {books: books, title: 'Books'})
    })
    .catch( err => res.send(500, err))
});

//Shows create new book form
router.get('/new', (req, res, next) => {
  res.render('books/new-book', {book: {}, title: 'New Book'})
});

//Shows update book form
router.get('/:id', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then( book => {
      if (book) {
        res.render("books/update-book", {book: book, title: "Edit Book", editPage: true})
      } else {
        res.send(404)
      }
    })
    .catch( err => res.send(500, err))
});

//Posts a new book to the database
router.post('/new', (req, res, next) => {
  Book.create(req.body)
    .then( books => res.redirect('/'))
    .catch( err => {
      if (err.name === "SequelizeValidationError") {
        res.render('books/new-book', {book: Book.build(req.body), errors: err.errors, title: "New Book"})
      } else {
        throw err
      }
    })
    .catch( err => res.send(500, err))
})

//Patches a book in the database
router.post('/:id', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then( book => {
      if (book) {
        return book.update(req.body)
      } else {
        res.send(404)
      }
    })
    .then( book => res.redirect('/'))
    .catch( err => {
      if (err.name === "SequelizeValidationError") {
        let book = Book.build(req.body)
        book.id = req.params.id
        res.render('books/update-book', {book: book, errors: err.errors, editPage: true, title: "Edit Book"})
      } else {
        throw err
      }
    })
    .catch( err => res.send(500, err))
})

// if(error.name === 'SequelizeValidationError') {
//     var book = Book.build(req.body);
//     book.id = req.params.id;
//     res.render("books/edit",{book:book,errors:error.errors,title:"Edit Book",currentPage:currentPage});
//   } else {
//     throw error;

//Deletes a book from database
router.delete('/:id', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then( book => {
      if (book) {
        return book.destroy()
      } else {
        res.send(404)
      }
    })
    .then( book => res.redirect('/'))
    .catch( err => res.send(500, err))
})


module.exports = router;
