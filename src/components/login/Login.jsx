import { useState } from 'react'
import Button from '../button/Button'
import InputLabel from '../inputLabel/InputLabel'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../../features/user/userSlice'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()
    dispatch(loginUserAction({ username, password }))
    setUsername('')
    setPassword('')
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

export default Login
