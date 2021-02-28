import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('testing blog component', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      author: 'romiko',
      title: 'testing component',
      likes: 10,
      url: 'testing',
      user: {
        username: 'romiko',
      },
    }

    const user = { username: 'romiko' }

    component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    )
  })

  test('render content', () => {
    const author = component.container.querySelector('.author')
    const title = component.container.querySelector('.title')
    const likes = component.container.querySelector('.likes')
    const url = component.container.querySelector('.url')

    expect(author).toHaveTextContent('romiko')
    expect(title).toHaveTextContent('testing component')
    expect(likes === null)
    expect(url === null)
  })

  test('clicking the button calls event handler once', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const likes = component.container.querySelector('.likes')
    const url = component.container.querySelector('.url')

    expect(likes).toBeDefined()
    expect(url).toBeDefined()
  })

  test('clicking like button twice', () => {
    const button1 = component.getByText('View')
    fireEvent.click(button1)

    const button2 = component.getByText('Like')
    fireEvent.click(button2)
    fireEvent.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
