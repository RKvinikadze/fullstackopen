import userService from '../services/users'

export const initializeUser = blog => {
  return async dispatch => {
    const user = await userService.getAll()
    dispatch({
      type: 'initialize_user',
      data: user,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'initialize_user':
      return action.data
    default:
      return state
  }
}

export default reducer