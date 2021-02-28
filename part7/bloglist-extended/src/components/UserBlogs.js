import React from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const UserBlogs = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blog)
  const id = useParams().id
  const user = users.find(user => user.id === id)

  const userBlogs = blogs.filter(blog => blog.user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ListGroup variant="flush">
        {userBlogs.map(blog => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default UserBlogs
