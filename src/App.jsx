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
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import AllUsers from './components/allUsers/AllUsers'
import User from './components/user/User'
import Blog from './components/blog/Blog'
import { setUsersAction } from './features/users/usersSlice'
import { initializeBlogs } from './features/blogs/blogsSlice'

const App = () => {
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const { pathname } = useLocation()

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

  useEffect(() => {
    dispatch(setUsersAction())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div className=" flex justify-center items-center h-screen bg-background text-white">
      {user === null ? (
        <Login setNotification={setNotification} setUser={setUser} />
      ) : (
        <div className="h-screen">
          <nav className="flex p-2 items-center w-screen border-b-2 mb-2 text-base">
            <Link className=" m-2 p-2 bg-sky-800 rounded-lg" to="/">
              Blogs
            </Link>
            <Link className="m-2 p-2 bg-sky-800 rounded-lg" to="/users">
              Users
            </Link>
            <div>{`${user.name} logged in`}</div>
            <div className="text-right w-full">
              <Button type="button" text="Logout" handle={handleLogout} />
            </div>
          </nav>
          <div>
            <Notification notification={notification} />
          </div>

          {pathname === '/' && (
            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
          )}

          <Routes>
            <Route path="/" element={<AllBlogs />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog userId={user.id} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
