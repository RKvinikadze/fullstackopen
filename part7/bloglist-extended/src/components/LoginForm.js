import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { connect } from 'react-redux'
import { currentUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.currentUser(user)
      history.push('/')
      props.setNotification(
        { text: `you successfully logged in`, type: 'success' },
        5
      )
    } catch (exception) {
      props.setNotification(
        { text: `wrong username or password`, type: 'error' },
        5
      )
    }
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.displayName = 'LoginForm'

const connectedLoginForm = connect(null, { setNotification, currentUser })(
  LoginForm
)

export default connectedLoginForm
