import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { CURRENT_USER, BOOK_BY_GENRE } from '../queries'

const Recommend = props => {
  const currentUser = useQuery(CURRENT_USER)
  const [getData, result] = useLazyQuery(BOOK_BY_GENRE)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (currentUser.data) {
      props.setCurrent(currentUser.data.me.favoriteGenre)
      getData({ variables: { genre: currentUser.data.me.favoriteGenre } })
    } // eslint-disable-next-line
  }, [currentUser.data])

  useEffect(() => {
    console.log("mydataaa", result.data)
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!books) {
    return <div>...loading</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in you favortie genre {currentUser.data.me.favoriteGenre}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => {
            if (book.genres.includes(currentUser.data.me.favoriteGenre)) {
              return (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )
            }
            return null
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
