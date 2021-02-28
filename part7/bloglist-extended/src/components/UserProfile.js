import React, { useState } from 'react'
import BlogForm from './BlogForm'
import { Button } from 'react-bootstrap'

const UserProfile = () => {
  const [visibility, setVisibility] = useState(true)
  const handleVisibility = () => {
    setVisibility(!visibility)
  }
  return (
    <div>
      {visibility ? (
        <Button variant="primary" size="sm" onClick={handleVisibility} block>
          ADD NEW BLOG
        </Button>
      ) : (
        <BlogForm handleVisibility={handleVisibility} />
      )}
    </div>
  )
}

export default UserProfile
