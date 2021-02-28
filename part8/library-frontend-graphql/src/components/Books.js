import React, { useState, useEffect } from 'react'

const Books = props => {
  //const allBooks = useQuery(ALL_BOOKS)

  const [filtered, setFiltered] = useState(null)

  useEffect(() => {
    setFiltered(props.allBooks.data.allBooks)
  }, [props.allBooks.data.allBooks])
  //const books = allBooks.data.allBooks

  if (!filtered) {
    return <div>...loading</div>
  }
  let genres = ['all genres']
  props.allBooks.data.allBooks.forEach(book => {
    return book.genres.forEach(genre =>
      !genres.includes(genre) ? (genres = genres.concat(genre)) : null
    )
  })

  const filterByGenre = genre => {
    if (genre === 'all genres') {
      setFiltered(props.allBooks.data.allBooks)
    } else {
      const filter = props.allBooks.data.allBooks.filter(book => {
        if (book.genres.includes(genre)) {
          return book
        }
        return null
      })
      setFiltered(filter)
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtered.map(a => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {genres.map((genre, i) => {
        return (
          <button key={i} onClick={() => filterByGenre(genre)}>
            {genre}
          </button>
        )
      })}
    </div>
  )
}

export default Books
