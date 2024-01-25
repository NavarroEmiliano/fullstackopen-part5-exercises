import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import AllBlogs from './components/AllBlogs'

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

  const handleLogin = async event => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    setUsername('')
    setPassword('')
    setUser(user)
    console.log(response)
  }

  console.log(username)
  console.log(password)

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
          <AllBlogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
