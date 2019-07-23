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
  res.render('books/new', {book: {}, title: 'New Book'})
})



// /* Create a new book form. */
// router.get('/new', function(req, res, next) {
//   res.render("books/new", {book: {}, title: "New Book"});
// });

// /* POST create book. */
// router.post('/', function(req, res, next) {
//   Book.create(req.body).then(function(book) {
//     res.redirect("/books/" + book.id);
//   }).catch(function(error){
//       if(error.name === "SequelizeValidationError") {
//         res.render("books/new", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
//       } else {
//         throw error;
//       }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// ;});

// /* Create a new book form. */
// router.get('/new', function(req, res, next) {
//   res.render("books/new", {book: {}, title: "New Book"});
// });

// /* Edit book form. */
// router.get("/:id/edit", function(req, res, next){
//   Book.findByPk(req.params.id).then(function(book){
//     if(book) {
//       res.render("books/edit", {book: book, title: "Edit Book"});
//     } else {
//       res.send(404);
//     }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });


// /* Delete book form. */
// router.get("/:id/delete", function(req, res, next){
//   Book.findByPk(req.params.id).then(function(book){
//     if(book) {
//       res.render("books/delete", {book: book, title: "Delete Book"});
//     } else {
//       res.send(404);
//     }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });

//
// //Book show page
// router.get("/:id", function(req, res, next){
//   Book.findByPk(req.params.id).then(function(book){
//     if(book) {
//       res.render("books/show", {book: book, title: book.title});
//     } else {
//       res.send(404);
//     }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });
//
// /* PUT update book. */
// router.put("/:id", function(req, res, next){
//   Book.findByPk(req.params.id).then(function(book){
//     if(book) {
//       return book.update(req.body);
//     } else {
//       res.send(404);
//     }
//   }).then(function(book){
//     res.redirect("/books/" + book.id);
//   }).catch(function(error){
//       if(error.name === "SequelizeValidationError") {
//         const book = Book.build(req.body);
//         book.id = req.params.id;
//         res.render("books/edit", {book: book, errors: error.errors, title: "Edit Book"})
//       } else {
//         throw error;
//       }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });
//
// /* DELETE individual book. */
// router.delete("/:id", function(req, res, next){
//   Book.findByPk(req.params.id).then(function(book){
//     if(book) {
//       return book.destroy();
//     } else {
//       res.send(404);
//     }
//   }).then(function(){
//     res.redirect("/books");
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });


module.exports = router;
