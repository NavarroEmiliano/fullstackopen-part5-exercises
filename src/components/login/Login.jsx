import { useEffect, useState } from 'react'
import Button from '../button/Button'
import InputLabel from '../inputLabel/InputLabel'
import blogService from '../../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAction } from '../../features/user/userSlice'

const Login = ({ setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      dispatch(loginUserAction({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
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
