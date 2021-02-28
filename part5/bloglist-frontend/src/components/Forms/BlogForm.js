import React, { useState } from 'react'

const BlogForm = ({ addBlog, handleVisibility }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = event => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </div>
        <div>
          <button type="submit" id="create-blog">create</button>
        </div>
        <div>
          <button onClick={handleVisibility}>cancel</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
