
import React from 'react'
import Blog from './Blog'
import BlogForm from './Forms/BlogForm'

const UserProfile = ({
  logOut,
  addBlog,
  user,
  title,
  author,
  url,
  handleChangeTitle,
  handleChangeAuthor,
  handleChangeUrl,
  blogs,
  visibility,
  handleVisibility,
  updateBlog,
  deleteBlog,
}) => {
  const dsc = blogs.sort((blog1, blog2) => {
    return blog2.likes - blog1.likes
  })

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={logOut} id="logout">log out</button>
      </p>

      {visibility ? (
        <button onClick={handleVisibility} id="create-new-blog">create new blog</button>
      ) : (
        <BlogForm
          addBlog={addBlog}
          title={title}
          author={author}
          url={url}
          handleChangeAuthor={handleChangeAuthor}
          handleChangeTitle={handleChangeTitle}
          handleChangeUrl={handleChangeUrl}
          handleVisibility={handleVisibility}
        />
      )}

      {dsc.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default UserProfile
