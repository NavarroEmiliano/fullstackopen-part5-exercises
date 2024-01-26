import { useEffect, useState } from 'react'
import Button from '../button/Button'

const Blog = ({ blog, updateBlog, deleteBlog, userId }) => {
  const [visible, setVisible] = useState(false)
  const [showRemove,setShowRemove] = useState(false)

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

  const deleteBlogSubmit = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlog(blog.id)
    }
  }


  useEffect(()=>{
    const belongsToUser = userId === blog.user.id
    setShowRemove(belongsToUser)
  },[])


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
          {showRemove && <Button text='Remove' handle={deleteBlogSubmit} />}
        </div>
      )}
    </div>
  )
}

export default Blog
