import { useState } from 'react'
import InputLabel from './InputLabel'
import blogService from '../services/blogs'
import Button from './Button'

const BlogForm = ({ setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogHandle = async () => {
    const response = await blogService.createBlog({ title, author, url })
    if (response.author) {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
  }

  return (
    <div>
      <h2>Create New</h2>
      <form>
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
        <Button type='button' text='Create' handle={createBlogHandle} />
      </form>
    </div>
  )
}

export default BlogForm
