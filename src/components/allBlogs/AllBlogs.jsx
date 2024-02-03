import Blog from '../blog/Blog'
import blogService from '../../services/blogs'
import PropTypes from 'prop-types'

const AllBlogs = ({ blogs, setBlogs, user }) => {
  const updateBlogSubmit = async (blog, blogId) => {
    try {
      const response = await blogService.updateBlog(blog, blogId)
      setBlogs(blogs.map(obj => (obj.id === response.id ? response : obj)))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlogSubmit = async blogId => {
    try {
      const response = await blogService.deleteBlog(blogId)
      if (response.status === 204) {
        setBlogs(blogs.filter(b => b.id !== blogId))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="blog-list">
      <h2>blogs</h2>
      {blogs.length
        ? blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlogSubmit}
                deleteBlog={deleteBlogSubmit}
                userId={user.id}
              />
            ))
        : ''}
    </div>
  )
}

AllBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default AllBlogs
