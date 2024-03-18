import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Login from './components/login/Login'
import AllBlogs from './components/allBlogs/AllBlogs'
import Button from './components/button/Button'
import BlogForm from './components/blogForm/BlogForm'
import Notification from './components/notificacion/Notification'
import Togglable from './components/togglable/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUser } from './features/user/userSlice'
import { setNotification } from './features/notification/notificationSlice'

const App = () => {
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const createBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

  useEffect(() => {
    const userLogged = window.localStorage.getItem('loggedBlogappUser')
    if (userLogged) {
      const user = JSON.parse(userLogged)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
