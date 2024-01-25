import Button from './Button'
import InputLabel from './InputLabel'

const Login = ({password,setPassword,username,setUsername,handleLogin}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <InputLabel textLabel='Username' type='text' value={username} setValue={setUsername}/>
        <InputLabel textLabel='Password' type='password' value={password} setValue={setPassword}/>
        <Button type='submit ' text='Login' />
      </form>
    </div>
  )
}

export default Login
