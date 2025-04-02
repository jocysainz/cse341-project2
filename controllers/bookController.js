const Book = require('../models/bookTemp');

//GET all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

//POST a new book
const createBook = async (req, res) => {
  try {
    const { title, author, pages, publishedYear } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and Author are required' });
    }

    const newBook = new Book({ title, author, pages, publishedYear });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

//PUT update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, pages, publishedYear } = req.body;

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
    res.status(500).json({ message: 'Error updating book', error });
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
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
