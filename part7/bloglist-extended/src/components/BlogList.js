import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  const dsc = blogs.sort((blog1, blog2) => {
    return blog2.likes - blog1.likes
  })

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>blogs</h2>
      <Table striped>
        <tbody>
          {dsc.map(blog => (
            <tr key={blog.id}>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td style={{ textAlign: 'center' }}>{blog.user.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
