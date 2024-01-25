import { useState } from 'react'
import InputLabel from '../inputLabel/InputLabel'
import blogService from '../../services/blogs'
import Button from '../button/Button'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogHandle = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={createBlogHandle}>
        <InputLabel
          textLabel='Title'
          type='text'
          value={title}
          setValue={setTitle}
        />
        <InputLabel
          textLabel='Author'
          type='text'
          value={author}
          setValue={setAuthor}
        />
        <InputLabel textLabel='Url' type='text' value={url} setValue={setUrl} />
        <button type='submit'>Create Blog</button>
      </form>
    </div>
  )
}

export default BlogForm
