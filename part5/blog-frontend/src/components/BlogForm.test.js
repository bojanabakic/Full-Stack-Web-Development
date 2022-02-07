import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const testBlog = {
    url: 'test',
    title: 'test',
    author: 'test',
    likes: '',
  }

  test('calls the event handler it received as props with the right details when a new blog is created', () => {
    const mockHandler = jest.fn()
    const component = render(<BlogForm addBlog={mockHandler} />)

    const title = component.getByTestId('title')
    fireEvent.change(title, { target: { value: 'test' } })
    const author = component.getByTestId('author')
    fireEvent.change(author, { target: { value: 'test' } })
    const url = component.getByTestId('url')
    fireEvent.change(url, { target: { value: 'test' } })

    fireEvent.click(component.getByTestId('addBlog'))
    expect(mockHandler).toBeCalledWith(testBlog)
  })
})