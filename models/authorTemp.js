const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  birthPlace: {
    type: String,
    required: [true, 'Place of birth is required'],
  },
  deathYear: {
    type: Number,
  },
}, { timestamps: true });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
