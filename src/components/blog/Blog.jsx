import { useState } from 'react'
import Button from '../button/Button'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBotton: 5
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  const updateBlogSubmit = async () => {
    const blogId = blog.id
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(updatedBlog, blogId)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Button text={visible ? 'Hide' : 'View'} handle={handleVisible} />
      {visible && (
        <div>
          <p>{blog.url}</p>
          Likes: {blog.likes}
          <Button text='Like' handle={updateBlogSubmit} />
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
