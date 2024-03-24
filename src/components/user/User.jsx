import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

/* eslint-disable react/prop-types */
const User = () => {
  const { id } = useParams()
  const user = useSelector(store => {
    const userFound = store.users.find(user => user.id === id)
    return userFound
  })

  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
