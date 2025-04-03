const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  birthPlace: {
    type: String,
    required: [true, 'Place of birth is required'],
  },
  deathYear: {
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

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
