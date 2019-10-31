const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require("graphql");
// const _ = require("lodash");

const Author = require('../model/author')
const Book = require('../model/book')

const authors = [
  { id: "1", name: "gary fisher", age: 32 },
  { id: "2", name: "felix dua", age: 55 },
  { id: "3", name: "julius carter", age: 66 },
  { id: "4", name: "jane fin", age: 82 },
  { id: "5", name: "fu phen", age: 83 }
];

const books = [
  { id: "1", name: "Good is bad", genre: "reality", authorId: "2" },
  { id: "2", name: "Endeavour to be", genre: "advice", authorId: "1"},
  { id: "3", name: "My heart feels me", genre: "spirituality", authorId: "3" }
];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Book.findById(parent.id)
        // return _.filter(books, {authorId: parent.id})
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
        // return _.filter(auhors, {id: parent.authorId})
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // TODO: return the result here
        return Author.findById(args.id);
        // return _.find(authors, { id: args.id });
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      args: {},
      resolve(parent, args) {
        // TODO: return the result here
        return Author.find({})
        // return authors;
      }
    },
    book: {
      type: BookType,
      args: {
        id: {type: GraphQLID},
      },
      resolve(parent, args) {
        return Book.findById(args.id)
        // return _.find(books, {id: args.id})
      }
    },
    books: {
      type: GraphQLList(BookType),
      args: {},
      resolve(parent, args) {
        return Book.find({})
        // return books
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString)
        },
        age: {
          type: GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: GraphQLNonNull(GraphQLID)
        },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
