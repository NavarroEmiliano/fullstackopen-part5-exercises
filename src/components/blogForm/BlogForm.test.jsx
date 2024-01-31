import { describe, expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'
import { fireEvent, render } from '@testing-library/react'

describe('Blog orm test', () => {
  test('should call to the controller with the correct details', () => {
    const mockHandler = vi.fn()

    const component = render(<BlogForm createBlog={mockHandler} />)
    const input = component.container.querySelector('#Author')
    const form = component.container.querySelector('.blog-form')
    fireEvent.change(input, {
      target: { value: 'testing the input Author' }
    })
    fireEvent.submit(form)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].author).toBe('testing the input Author')
  })
})
