import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import AllBlogs from './components/AllBlogs'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
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
          <BlogForm setBlogs={setBlogs} setNotification={setNotification} />
          <AllBlogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
