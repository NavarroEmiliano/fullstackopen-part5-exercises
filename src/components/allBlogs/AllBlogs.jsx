import Blog from '../blog/Blog'
import blogService from '../../services/blogs'

const AllBlogs = ({ blogs, setBlogs }) => {
  const updateBlogSubmit = async (blog, blogId) => {
    try {
      const response = await blogService.updateBlog(blog, blogId)
      setBlogs(blogs.map(obj => (obj.id === response.id ? response : obj)))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlogSubmit} />
      ))}
    </div>
  )
}

export default AllBlogs
