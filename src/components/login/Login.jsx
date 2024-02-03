import { useState } from 'react'
import Button from '../button/Button'
import InputLabel from '../inputLabel/InputLabel'
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import PropTypes from 'prop-types'

const Login = ({ setNotification, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (error) {
      setNotification(error.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} className="login-form">
        <InputLabel
          textLabel="Username"
          type="text"
          value={username}
          setValue={setUsername}
          id="username"
        />
        <InputLabel
          textLabel="Password"
          type="password"
          value={password}
          setValue={setPassword}
          id="password"
        />
        <Button type="submit " text="Login" />
      </form>
    </div>
  )
}

Login.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default Login
