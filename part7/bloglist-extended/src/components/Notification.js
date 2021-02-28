import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const classN =
    notification.type === 'error' ? `alert alert-danger` : 'alert alert-success'
  return notification ? (
    <div className={classN} role="alert">
      {notification.text}
    </div>
  ) : (
    <></>
  )
}

export default Notification
