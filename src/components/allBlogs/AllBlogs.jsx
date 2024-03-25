import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../../features/blogs/blogsSlice'
import { Link } from 'react-router-dom'

const AllBlogs = () => {
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
      <h2 className="text-2xl font-bold">Blogs</h2>
      <ul style={{ padding: 0 }}>
        {sortedBlogs
          ? sortedBlogs.map(blog => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))
          : ''}
      </ul>
    </div>
  )
}

export default AllBlogs
