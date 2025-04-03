const Book = require('../models/bookTemp');

//GET all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

//POST a new book
const createBook = async (req, res) => {
  try {
    const { title, author, pages, publishedYear } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and Author are required' });
    }

    //validate 'pages'
    if (pages && typeof pages !== 'number') {
      return res.status(400).json({ message: 'Pages must be a number' });
    }

    //validate 'publishedYear'
    if (publishedYear && typeof publishedYear !== 'number') {
      return res.status(400).json({ message: 'Published year must be a number' });
    }

    const newBook = new Book({ title, author, pages, publishedYear });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

//PUT update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, pages, publishedYear } = req.body;

    //validate that 'title' and 'author' are provided
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and Author are required to update' });
    }

    //validate 'pages'
    if (pages && typeof pages !== 'number') {
      return res.status(400).json({ message: 'Pages must be a number' });
    }

    //validate 'publishedYear'
    if (publishedYear && typeof publishedYear !== 'number') {
      return res.status(400).json({ message: 'Published year must be a number' });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, pages, publishedYear },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

//DELETE a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
