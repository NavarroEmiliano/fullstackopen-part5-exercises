import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Login from './components/login/Login'
import AllBlogs from './components/allBlogs/AllBlogs'
import Button from './components/button/Button'
import BlogForm from './components/blogForm/BlogForm'
import Notification from './components/notificacion/Notification'
import Togglable from './components/togglable/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUser } from './features/user/userSlice'

const App = () => {
  const [notification, setNotification] = useState(null)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const createBlog = async newBlog => {
    try {
      dispatch(createBlog(newBlog))
      setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const userLogged = window.localStorage.getItem('loggedBlogappUser')
    if (userLogged) {
      const user = JSON.parse(userLogged)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }

    if (user) {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
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
          <Button type="button" text="Logout" handle={handleLogout} />
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <AllBlogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
