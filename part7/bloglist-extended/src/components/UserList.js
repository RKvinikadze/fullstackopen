import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const userBlogsLength = (id, blogs) => {
  const userBlogs = blogs.filter(blog => blog.user.id === id)
  return userBlogs.length
}

const UserList = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blog)

  return (
    <Table>
      <thead>
        <tr>
          <th>users</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{userBlogsLength(user.id, blogs)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
export default UserList
