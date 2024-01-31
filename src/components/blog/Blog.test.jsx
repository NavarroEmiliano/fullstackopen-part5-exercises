import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vitest } from 'vitest'
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

  it('should show the title but not the Url and Likes', () => {
    const { container } = render(<Blog blog={blog} />)
    expect(container).toHaveTextContent('Title')
    expect(container).not.toHaveTextContent('Url')
    expect(container).not.toHaveTextContent('Likes')
  })

  it('should show the Url and number of likes after clicking in the view button', () => {
    const { container } = render(<Blog blog={blog} />)
    const viewButton = container.querySelector('.visible-btn')
    fireEvent.click(viewButton)
    expect(container).toHaveTextContent('Likes: 5')
    expect(container).toHaveTextContent('Url')
  })
})
