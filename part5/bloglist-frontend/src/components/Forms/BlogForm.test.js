import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('testing blog form', () => {
  const createBlog = jest.fn()
  let component
  beforeEach(() => {
    component = render(<BlogForm addBlog={createBlog} />)
  })

  test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing title input' },
    })
    fireEvent.change(author, {
      target: { value: 'testing author input' },
    })
    fireEvent.change(url, {
      target: { value: 'testing url input' },
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'testing title input',
      author: 'testing author input',
      url: 'testing url input',
      likes: 0,
    })
  })
})
