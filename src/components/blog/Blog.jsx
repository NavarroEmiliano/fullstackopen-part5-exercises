/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Button from '../button/Button'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlogAction,
  updateBlogAction
} from '../../features/blogs/blogsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import CommentForm from '../commentForm/CommentForm'

const Blog = ({ userId }) => {
  const [showRemove, setShowRemove] = useState(false)
  const dispatch = useDispatch()

  const { id } = useParams()

  const navigate = useNavigate()

  const blogs = useSelector(state => state.blogs)

  const blog = blogs.length ? blogs.find(blog => blog.id === id) : null

  const users = useSelector(state => state.users)

  const user =
    users.length && blog
      ? users.find(user => user.id === blog.user.id || user.id === blog.user)
      : null

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    borderWidth: 1,
    marginBotton: 5
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
      navigate('/')
    }
  }

  useEffect(() => {
    if (user && blog) {
      const belongsToUser = userId === blog.user.id || userId === blog.user
      setShowRemove(belongsToUser)
    }
  }, [])

  return (
    <div style={blogStyle} className="blog">
      <h1>{blog?.title}</h1>
      <div>
        <p>Url: {blog?.url}</p>
        Likes: {blog?.likes}
        <Button text="Like" handle={updateBlogSubmit} className="like-btn" />
        <p>Author: {blog?.author}</p>
        <p>Added by {user?.name}</p>
        {showRemove && <Button text="Remove" handle={deleteBlogSubmit} />}
      </div>

      <h3>Comments</h3>
      <CommentForm blogId={id} />
      <ul>
        {blog?.comments?.map(comment => (
          <li key={crypto.randomUUID()}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  userId: PropTypes.string
}

export default Blog
