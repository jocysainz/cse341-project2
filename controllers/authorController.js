const Author = require('../models/authorTemp');

//GET all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors', error });
  }
};

//POST a new author
const createAuthor = async (req, res) => {
  try {
    const { birthPlace, deathYear } = req.body;

    if (!birthPlace) {
      return res.status(400).json({ message: 'Place of birth is required' });
    }

    const newAuthor = new Author({ birthPlace, deathYear });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error });
  }
};

//PUT - update an author
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { birthPlace, deathYear } = req.body;

    if (!birthPlace) {
      return res.status(400).json({ message: 'Place of birth is required to update' });
    }

    const author = await Author.findByIdAndUpdate(
      id,
      { birthPlace, deathYear },
      { new: true, runValidators: true }
    );

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error updating author', error });
  }
};

//DELETE an author
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting author', error });
  }
};

module.exports = {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
