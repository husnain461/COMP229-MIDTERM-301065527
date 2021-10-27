// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//const book = require('../models/books');

//connect to Book Model zhelikeyiliuyi!!!!!!!!!!!!!
let book = require('../models/books');


/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else 
    {
      res.render('books/index', {title: 'Books', books: books}); //you ke neng shi books or index
    }
  });
});

//  GET the Book Details page in order to add a new Book
// zhu yi!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/add', (req, res, next) => {
  res.render('books/add', {title:'Add Book'});//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let newBook = book({
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  });

  book.create(newBook, (err,book) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  book.findById(id, (err, bookToEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //show the edit view
      res.render('books/edit', {title:'Edit Book', books: bookToEdit})
    }
  })
});

// POST - process the information passed from the details form and update the document

//zhu yi!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  console.log(req.body);

  let updatedBook = book({
    "_id": id,
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  });

  book.updateOne({_id: id}, updatedBook, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  book.remove({_id: id}, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/books');
    }
  });
});


module.exports = router;
