const Author = require('../models/authorTemp');

//GET all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors', error: error.message });
  }
};

//POST a new author
const createAuthor = async (req, res) => {
  try {
    const { birthPlace, deathYear } = req.body;

    if (!birthPlace) {
      return res.status(400).json({ message: 'Place of birth is required' });
    }

    //validate 'deathYear' if it's a number
    if (deathYear && typeof deathYear !== 'number') {
      return res.status(400).json({ message: 'Death year must be a number' });
    }

    const newAuthor = new Author({ birthPlace, deathYear });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error: error.message });
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

    //validate 'deathYear'
    if (deathYear && typeof deathYear !== 'number') {
      return res.status(400).json({ message: 'Death year must be a number' });
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
    res.status(500).json({ message: 'Error updating author', error: error.message });
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
    res.status(500).json({ message: 'Error deleting author', error: error.message });
  }
};

module.exports = {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
