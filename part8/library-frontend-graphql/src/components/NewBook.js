import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_BOOK,
  CURRENT_USER,
} from '../queries'

const NewBook = ({updateCacheWith, setCurrent}) => {
  const currentUser = useQuery(CURRENT_USER)
  //const [getData, result] = useLazyQuery(BOOK_BY_GENRE)//eslint-disable-line
  //const [books, setBooks] = useState(null)

  /*useEffect(() => {
    if (currentUser.data) {
      getData({ variables: { genre: currentUser.data.me.favoriteGenre } })
    } // eslint-disable-next-line
  }, [currentUser.data])*/

  /*useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])*/
  

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: error => console.log(error),
    /*refetchQueries: [
      {
        query: BOOK_BY_GENRE,
        variables: { genre: currentUser.data?currentUser.data.me.favoriteGenre:null },
      },
    ],*/
    update: (store, response) => {
      updateCacheWith(response.data.addBook, currentUser.data?currentUser.data.me.favoriteGenre:null)
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const submit = async event => {
    event.preventDefault()

    createBook({
      variables: {
        title: title,
        published: parseInt(published),
        author: author,
        genres: genres,
      },
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if(currentUser.loading){
    return <div>...loading</div>
  }

  setCurrent(currentUser.data.me.favoriteGenre)

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
