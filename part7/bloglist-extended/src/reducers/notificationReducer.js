const initialState = ''
let timer

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'set_notification',
      data: {
        text: notification.text,
        type: notification.type,
      },
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'clear_notification',
        data: {},
      })
    }, time * 1000)
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action: ', action)

  switch (action.type) {
    case 'set_notification':
      return { text: action.data.text, type: action.data.type }
    case 'clear_notification':
      return ''
    default:
      return state
  }
}

export default reducer
