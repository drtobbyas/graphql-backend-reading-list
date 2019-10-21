const mongoose = require('mongoose')

const Author = mongoose.Schema({
  name: String,
  age: Number
})

module.exports = mongoose.model('Authors', Author)