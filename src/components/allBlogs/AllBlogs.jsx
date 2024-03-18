import Blog from '../blog/Blog'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../../features/blogs/blogsSlice'

const AllBlogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const sortedBlogs = blogs.length
    ? [...blogs].sort((a, b) => b.likes - a.likes)
    : ''

  return (
    <div className="blog-list">
      <h2>blogs</h2>
      {sortedBlogs
        ? sortedBlogs.map(blog => (
            <Blog key={blog.id} blog={blog} userId={user.id} />
          ))
        : ''}
    </div>
  )
}

AllBlogs.propTypes = {
  user: PropTypes.object.isRequired
}

export default AllBlogs
