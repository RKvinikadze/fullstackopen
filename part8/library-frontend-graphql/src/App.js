import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { useApolloClient, useSubscription } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, BOOK_BY_GENRE } from './queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [current, setCurrent] = useState(null)
  const client = useApolloClient()
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const updateCacheWith = (addedBook, genre = null) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)
    //const includeAuthor = (set, object) => set.map(p => p.author.id).includes(object.author.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    //console.log("bookdata", dataInStore, "addedBookdata", addedBook)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
    console.log('boook', addedBook)
    const authorsDataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(authorsDataInStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authorsDataInStore.allAuthors.concat(addedBook.author),
        },
      })
    }

    const incl = (obj, genre) => obj.genres.includes(genre)
    if (genre) {
      const Genre = client.readQuery({
        query: BOOK_BY_GENRE,
        variables: { genre: genre },
      })
      if (Genre) {
        if (!includedIn(Genre.allBooks, addedBook) && incl(addedBook, genre)) {
          client.writeQuery({
            query: BOOK_BY_GENRE,
            variables: { genre: genre },
            data: { allBooks: Genre.allBooks.concat(addedBook) },
          })
        }
      }
    }
  }

  //query: BOOK_BY_GENRE,
  //    variables: { genre: currentUser.data?currentUser.data.me.favoriteGenre:null }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook, current)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
    setCurrent(null)
  }

  if (books.loading || authors.loading) {
    return <div>...loading</div>
  }

  return (
    <div>
      {!token ? <div>token is not here</div> : <div>token is here</div>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>reommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      {page === 'authors' ? <Authors allAuthors={authors} /> : null}

      {page === 'books' ? <Books allBooks={books} /> : null}

      {page === 'add' ? (
        <NewBook updateCacheWith={updateCacheWith} setCurrent={setCurrent} />
      ) : null}

      {page === 'recommend' ? (
        <Recommend allBooks={books} setCurrent={setCurrent} />
      ) : null}

      {page === 'login' ? (
        <LoginForm setToken={setToken} setPage={setPage} />
      ) : null}
    </div>
  )
}

export default App
