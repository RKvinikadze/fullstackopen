import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

import { useMutation } from '@apollo/client'

const LoginForm = props => {
  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      props.setPage('authors')
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    } //eslint-disable-next-line
  }, [result.data]) 

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async event => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm