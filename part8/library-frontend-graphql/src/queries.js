import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      published
      genres
      title
      id
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`

export const CURRENT_USER = gql`
  query{
    me{
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      id
      genres
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`

export const BOOK_BY_GENRE = gql`
  query bookById($genre: String) {
    allBooks(genre: $genre) {
      published
      genres
      title
      id
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      id
      genres
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`