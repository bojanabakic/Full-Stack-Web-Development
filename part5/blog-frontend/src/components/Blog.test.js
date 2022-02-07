import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    url: 'test',
    title: 'test',
    author: 'test',
    likes: 1
  }

  test('renders blog\'s title and author, but does not render its url or number of likes by default', () => {
    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent('test')
    expect(component.container).toHaveTextContent('test')
    expect(component.container.url).toBeUndefined()
    expect(component.container.likes).toBeUndefined()
  })

  test('renders blog\'s url and number of likes when the button controlling the shown details has been clicked', () => {
    const component = render(<Blog blog={blog} />)
    const blogs = component.getByTestId('blogs')
    const buttonView = component.getByTestId('viewButton')

    expect(blogs).toHaveTextContent('test')
    fireEvent.click(buttonView)

    const url = component.getByTestId('url')
    const likes = component.getByTestId('likes')
    const buttonLike = component.getByTestId('likeButton')
    const buttonRemove = component.getByTestId('removeButton')

    expect(url).toHaveTextContent('test')
    expect(likes).toHaveTextContent('1')
    expect(buttonLike).toBeDefined()
    expect(buttonRemove).toBeDefined()
  })

  test('if the like button is clicked twice, the event handler is also called twice', async () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} updateLikes={mockHandler} />)

    const blogs = component.getByTestId('blogs')
    const buttonView = component.getByTestId('viewButton')

    expect(blogs).toHaveTextContent('test')
    fireEvent.click(buttonView)

    const buttonLike = component.getByTestId('likeButton')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('renders new blog form', async () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} updateLikes={mockHandler} />)

    const blogs = component.getByTestId('blogs')
    const buttonView = component.getByTestId('viewButton')

    expect(blogs).toHaveTextContent('test')
    fireEvent.click(buttonView)

    const buttonLike = component.getByTestId('likeButton')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})