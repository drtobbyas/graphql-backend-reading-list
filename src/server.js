require('dotenv').config();
const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema/schema')

const app = express().use(cors())
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('mongoDB connected successfully')
})

app.use('/graphql', graphqlHTTP({
  graphiql:true,
  schema
}))


app.listen(4000, () => {
  console.log('app running on port 4000');
})