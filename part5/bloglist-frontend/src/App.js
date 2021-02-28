import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/Forms/LoginForm'
import UserProfile from './components/UserProfile'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState({
    message: '',
    status: '',
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visibility, setVisibility] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setNotification({
        message: 'you successfully logged in',
        status: 'success',
      })
      setTimeout(() => {
        setNotification({
          message: '',
          status: '',
        })
      }, 5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        message: 'wrong username or password',
        status: 'error',
      })
      setTimeout(() => {
        setNotification({
          message: '',
          status: '',
        })
      }, 5000)
    }
  }

  const logOut = () => {
    setNotification({
      message: 'logged out successfully',
      status: 'success',
    })
    setTimeout(() => {
      setNotification({
        message: '',
        status: '',
      })
    }, 5000)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async newBlog => {
    try {
      const response = await blogService.create(newBlog)
      const currentUser = {
        id: response.user,
        username: user.username,
        name: user.name,
      }

      response.user = currentUser

      setBlogs(blogs.concat(response))
      setNotification({
        message: `a new blog ${newBlog.title} by ${user.name} added`,
        status: 'success',
      })
      setTimeout(() => {
        setNotification({
          message: '',
          status: '',
        })
      }, 5000)
      setVisibility(true)
    } catch (exception) {
      setNotification({
        message: 'invalid blog',
        status: 'error',
      })
      setTimeout(() => {
        setNotification({
          message: '',
          status: '',
        })
      }, 5000)
    }
  }

  const updateBlog = async blog => {
    console.log(blog)

    const id = blog.id
    const updatedBlog = {
      user: blog.user.toString(),
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    try {
      await blogService.update(id, updatedBlog)
      blog.likes = blog.likes + 1

      setBlogs(blogs.map(obj => (obj.id !== id ? obj : blog)))
    } catch (exception) {
      console.log('error')
    }
  }

  const deleteBlog = async blog => {
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await blogService.remove(blog.id)

        setBlogs(blogs.filter(obj => obj.id !== blog.id))

        setNotification({
          message: `successfully deleted blog ${blog.title} from database`,
          status: 'success',
        })
        setTimeout(() => {
          setNotification({
            message: '',
            status: '',
          })
        }, 5000)
      } catch (exception) {
        setNotification({
          message: 'error',
          status: 'error',
        })
        setTimeout(() => {
          setNotification({
            message: '',
            status: '',
          })
        }, 5000)
      }
    }
  }

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }

  const handleChangeAuthor = e => {
    setAuthor(e.target.value)
  }

  const handleChangeUrl = e => {
    setUrl(e.target.value)
  }

  return (
    <div>
      <h1 className={notification.message ? notification.status : ''}>
        {notification.message ? notification.message : ''}
      </h1>

      {user !== null ? (
        <UserProfile
          addBlog={addBlog}
          user={user}
          logOut={logOut}
          title={title}
          author={author}
          url={url}
          handleChangeTitle={handleChangeTitle}
          handleChangeAuthor={handleChangeAuthor}
          handleChangeUrl={handleChangeUrl}
          blogs={blogs}
          visibility={visibility}
          handleVisibility={handleVisibility}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ) : (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          login={login}
          password={password}
        />
      )}
    </div>
  )
}

export default App
