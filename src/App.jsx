import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import AllBlogs from './components/AllBlogs'
import Button from './components/Button'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async event => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
    setUser(user)
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>{`${user.name} logged in`}</p>
          <Button type='button' text='Logout' handle={handleLogout} />
          <BlogForm blogs={blogs} setBlogs={setBlogs}/>
          <AllBlogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
