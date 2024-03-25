import { useState } from 'react'
import Button from '../button/Button'
import InputLabel from '../inputLabel/InputLabel'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()
    dispatch(loginUserAction({ username, password }))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center w-80 h-72 mx-auto bg-slate-900 rounded-xl p-4  ">
      <h2 className="text-2xl pb-4">Log in to application</h2>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center h-full login-form"
      >
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
