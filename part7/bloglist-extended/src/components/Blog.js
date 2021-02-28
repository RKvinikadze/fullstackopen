import React, { useState } from 'react'
import { likeById, deleteById } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addCommentById } from '../reducers/blogReducer'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = props => {
  const id = useParams().id
  const history = useHistory()
  const blog = props.blog.find(blog => blog.id === id)

  const [comment, setComment] = useState('')

  const like = async blog => {
    try {
      await props.likeById(blog)
      props.setNotification(
        { text: `you liked ${blog.title}`, type: 'success' },
        5
      )
    } catch (exception) {
      props.setNotification({ text: `error`, type: 'error' }, 5)
    }
  }

  const remove = async blog => {
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await props.deleteById(blog)
        props.setNotification(
          {
            text: `successfully deleted blog ${blog.title} from database`,
            type: 'success',
          },
          5
        )
      } catch (exception) {
        props.setNotification({ text: `error`, type: 'error' }, 5)
      }
      history.push('/')
    }
  }

  const addComment = async event => {
    event.preventDefault()
    try {
      await props.addCommentById(blog.id, comment)
      props.setNotification({ text: `you added comment`, type: 'success' }, 5)
      setComment('')
    } catch (exception) {
      props.setNotification({ text: `error`, type: 'error' }, 5)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes}{' '}
        <Button variant="success" onClick={() => like(blog)}>
          like
        </Button>
      </div>
      <div>{blog.author}</div>
      {props.user.username === blog.user.username ? (
        <Button variant="danger" onClick={() => remove(blog)}>
          remove
        </Button>
      ) : (
        ''
      )}
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Your comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <Button variant="primary" size="md" type="submit" block>
          Add Comment
        </Button>
      </Form>
      <ListGroup variant="flush">
        {blog.comments.map((comment, key) => (
          <ListGroup.Item key={key}>{comment.text}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blog: state.blog,
  }
}

const connectedBlog = connect(mapStateToProps, {
  setNotification,
  addCommentById,
  likeById,
  deleteById,
})(Blog)
export default connectedBlog
