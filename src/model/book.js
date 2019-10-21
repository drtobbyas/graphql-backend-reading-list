const mongoose = require('mongoose')

const Book = mongoose.Schema({
  name: String,
  genre: String,
  authorId: String
})

module.exports = mongoose.model('Books', Book)