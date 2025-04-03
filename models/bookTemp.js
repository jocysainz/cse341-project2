const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  pages: {
    type: Number,
    default: 0,
  },
  publishedYear: {
    type: Number,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  },
  toObject: {
    transform: function (doc, ret) {
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
