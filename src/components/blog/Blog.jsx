/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Button from '../button/Button'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  deleteBlogAction,
  updateBlogAction
} from '../../features/blogs/blogsSlice'

const Blog = ({ blog, userId }) => {
  const [visible, setVisible] = useState(false)
  const [showRemove, setShowRemove] = useState(false)

  const dispatch = useDispatch()

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

    dispatch(updateBlogAction(updatedBlog, blogId))
  }

  const deleteBlogSubmit = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(deleteBlogAction(blog.id))
    }
  }

  useEffect(() => {
    const belongsToUser = userId === blog.user.id || userId === blog.user
    setShowRemove(belongsToUser)
  }, [])

  return (
    <div style={blogStyle} className="blog">
      {blog.title}
      <Button
        text={visible ? 'Hide' : 'View'}
        handle={handleVisible}
        className="visible-btn"
      />
      {visible && (
        <div>
          <p>{blog.url}</p>
          Likes: {blog.likes}
          <Button text="Like" handle={updateBlogSubmit} className="like-btn" />
          <p>{blog.author}</p>
          {showRemove && <Button text="Remove" handle={deleteBlogSubmit} />}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  userId: PropTypes.string
}

export default Blog
