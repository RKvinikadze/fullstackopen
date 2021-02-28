import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button, Col } from 'react-bootstrap'

const BlogForm = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    try {
      await props.createBlog(
        { title: title, author: author, url: url },
        props.user
      )
      props.setNotification(
        {
          text: `a new blog ${title} added by ${props.user.name}`,
          type: 'success',
        },
        5
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      props.handleVisibility()
    } catch (exception) {
      props.setNotification({ text: `invalid blog`, type: 'error' }, 5)
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" size="sm" type="submit" block>
          Create
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={props.handleVisibility}
          block
        >
          Cancel
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const connectedBlogForm = connect(mapStateToProps, {
  setNotification,
  createBlog,
})(BlogForm)
export default connectedBlogForm
