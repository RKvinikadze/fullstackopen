import React, { useEffect } from 'react'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/usersReducer'
import { currentUser } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserBlogs from './components/UserBlogs'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import UserProfile from './components/UserProfile'
import Notification from './components/Notification'
import { Container } from 'react-bootstrap'

const App = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(currentUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  return (
    <Container fluid>
      <Router>
        <Navigation />
        <Notification />
        {user ? <h1 style={{ textAlign: 'center' }}>Blog App</h1> : null}
        <Switch>
          <Route path="/users/:id">
            <UserBlogs />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/">
            <div>
              <UserProfile />
              <BlogList />
            </div>
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App
