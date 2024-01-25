import { useState } from 'react'
import InputLabel from './InputLabel'
import blogService from '../services/blogs'
import Button from './Button'

const BlogForm = ({ setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogHandle = async () => {
    try {
      const response = await blogService.createBlog({
        title,
        author,
        url
      })
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setNotification(`A new blog ${response.title} by ${response.author} added`)
      setTimeout(()=>{
        setNotification(null)
      },5000)
    } catch (error) {
      setNotification(error.response.data.error)
      setTimeout(()=>{
        setNotification(null)
      },5000)
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
