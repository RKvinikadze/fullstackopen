import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { Nav, Navbar, Button, Form } from 'react-bootstrap'

const Navigation = props => {
  const logOut = () => {
    props.setNotification(
      { text: `you successfully logged out`, type: 'success' },
      5
    )

    window.localStorage.removeItem('loggedBlogAppUser')
    props.clearUser()
    blogService.setToken('')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {props.user ? (
          <Form inline>
            <Nav.Item style={{ color: '#fff', marginRight: '10px' }}>
              {props.user.name} logged in
            </Nav.Item>
            <Button onClick={logOut}>Log Out</Button>
          </Form>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </Navbar>
    </div>
  )
}

const padding = {
  padding: 5,
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const connectedNavigation = connect(mapStateToProps, {
  clearUser,
  setNotification,
})(Navigation)

export default connectedNavigation
