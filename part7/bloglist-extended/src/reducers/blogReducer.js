import blogService from '../services/blogs'

export const initializeBlogs = blog => {
  return async dispatch => {
    const blog = await blogService.getAll()
    dispatch({
      type: 'initialize_blog',
      data: blog,
    })
  }
}

export const createBlog = (new_blog, currentUser) => {
  return async dispatch => {
    try {
      const response = await blogService.create(new_blog)
      const blog = {
        ...response,
        user: {
          id: response.user,
          username: currentUser.username,
          name: currentUser.name,
        },
      }
      dispatch({
        type: 'new_blog',
        data: blog,
      })
    } catch (exception) {
      throw exception
    }
  }
}

export const likeById = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch({
        type: 'like',
        data: {
          id: updatedBlog.id,
        },
      })
    } catch (exception) {
      throw exception
    }
  }
}

export const deleteById = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'remove',
        data: {
          id: blog.id,
        },
      })
    } catch (exception) {
      throw exception
    }
  }
}

export const addCommentById = (id, comment) => {
  return async dispatch => {
    if (comment === '') throw 'error'
    try {
      await blogService.createComment({ text: comment }, id)
      const newComment = { text: comment }
      dispatch({
        type: 'new_comment',
        data: {
          blogid: id,
          comment: newComment,
        },
      })
    } catch (exception) {
      throw exception
    }
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'new_blog':
      return [...state, action.data]
    case 'initialize_blog':
      return action.data
    case 'like':
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      const currentState = state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
      return currentState
    case 'remove':
      const currentBlogs = state.filter(blog => action.data.id !== blog.id)
      return currentBlogs
    case 'new_comment':
      const nid = action.data.blogid
      const updatedBlog = state.find(n => n.id === nid)
      updatedBlog.comments = updatedBlog.comments.concat(action.data.comment)
      return state.map(n => (n.id === nid ? updatedBlog : n))
    default:
      return state
  }
}

export default reducer
