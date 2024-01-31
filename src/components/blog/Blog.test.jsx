import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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
    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent('Title')
    expect(component.container).not.toHaveTextContent('Url')
    expect(component.container).not.toHaveTextContent('Likes')
  })
})
