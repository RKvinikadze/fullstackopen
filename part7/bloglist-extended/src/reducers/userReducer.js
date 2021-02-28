const initialState = ''

export const currentUser = user => {
  console.log('here comes useer', user)
  return async dispatch => {
    dispatch({
      type: 'save_user',
      data: { user },
    })
  }
}

export const clearUser = () => {
  return async dispatch => {
    dispatch({
      type: 'clear_user',
      data: {},
    })
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'save_user':
      console.log(action.data.user)
      return action.data.user
    case 'clear_user':
      return ''
    default:
      return state
  }
}

export default reducer
