import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showFullInfo, setShowFullInfo] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: '18px',
    fontWeight: 'bold',
  }

  return (
    <div>
      {showFullInfo ? (
        <div style={blogStyle}>
          <span className="title">{blog.title}</span>{' '}
          <span className="author">{blog.author}</span>
          <button onClick={() => setShowFullInfo(!showFullInfo)} className="view-blog">View</button>
        </div>
      ) : (
        <div style={blogStyle}>
          <div className="title">
            {blog.title}
            <button onClick={() => setShowFullInfo(!showFullInfo)}>Hide</button>
          </div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            {blog.likes}{' '}
            <button className="likeButton" onClick={() => updateBlog(blog)}>
              Like
            </button>
          </div>
          <div className="author">{blog.author}</div>

          {user.username === blog.user.username ? (
            <div>
              delete blog
              <button onClick={() => deleteBlog(blog)}>remove</button>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
