import { useState } from 'react'
import InputLabel from '../inputLabel/InputLabel'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlogAction } from '../../features/blogs/blogsSlice'
import { setNotificationAction } from '../../features/notification/notificationSlice'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const createBlogHandle = event => {
    event.preventDefault()
    dispatch(createBlogAction({ title, author, url }))

    dispatch(
      setNotificationAction({
        message: `A new blog ${title} by ${author} added`,
        type: 'success'
      })
    )

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={createBlogHandle} className="blog-form">
        <InputLabel
          textLabel="Title"
          type="text"
          value={title}
          setValue={setTitle}
          id="title"
        />
        <InputLabel
          textLabel="Author"
          type="text"
          value={author}
          setValue={setAuthor}
          id="author"
        />
        <InputLabel
          textLabel="Url"
          type="text"
          value={url}
          setValue={setUrl}
          id="url"
        />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
