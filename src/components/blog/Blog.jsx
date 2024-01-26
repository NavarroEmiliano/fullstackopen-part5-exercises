import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBotton: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button
        onClick={() => {
          setVisible(!visible)
        }}
      >
        {visible ? 'Hide' : 'View'}
      </button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          Likes: {blog.likes} <button>Like</button>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
