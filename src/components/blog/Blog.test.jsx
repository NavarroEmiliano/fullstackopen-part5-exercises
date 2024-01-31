import { fireEvent, render } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Blog from './Blog'

describe('Blog list', () => {
  const blog = {
    title: 'Title',
    url: 'Url',
    likes: 5,
    author: 'Author',
    user: {
      id: 'Id'
    }
  }

  test('should show the title but not the Url and Likes', () => {
    const { container } = render(<Blog blog={blog} />)
    expect(container).toHaveTextContent('Title')
    expect(container).not.toHaveTextContent('Url')
    expect(container).not.toHaveTextContent('Likes')
  })

  test('should show the Url and number of likes after clicking in the view button', () => {
    const { container } = render(<Blog blog={blog} />)
    const viewButton = container.querySelector('.visible-btn')
    fireEvent.click(viewButton)
    expect(container).toHaveTextContent('Likes: 5')
    expect(container).toHaveTextContent('Url')
  })

  test('should call to the controller at clicking twice the like button', () => {
    const mockHandler = vi.fn()
    const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />)
    const viewButton = container.querySelector('.visible-btn')
    fireEvent.click(viewButton)
    const likeBtn = container.querySelector('.like-btn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
