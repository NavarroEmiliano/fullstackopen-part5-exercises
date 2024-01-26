import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Login from './components/login/Login'
import AllBlogs from './components/allBlogs/AllBlogs'
import Button from './components/button/Button'
import BlogForm from './components/blogForm/BlogForm'
import Notification from './components/notificacion/Notification'
import Togglable from './components/togglable/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const createBlog = async newBlog => {
    try {
      const response = await blogService.createBlog(newBlog)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setNotification(
        `A new blog ${response.title} by ${response.author} added`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification(error.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const getAllBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const userLogged = window.localStorage.getItem('loggedBlogappUser')
    if (userLogged) {
      const user = JSON.parse(userLogged)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <div>
        <Notification notification={notification} />
      </div>
      {user === null ? (
        <Login setNotification={setNotification} setUser={setUser} />
      ) : (
        <div>
          <p>{`${user.name} logged in`}</p>
          <Button type='button' text='Logout' handle={handleLogout} />
          <Togglable buttonLabel='New Blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <AllBlogs blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </div>
  )
}

export default App
