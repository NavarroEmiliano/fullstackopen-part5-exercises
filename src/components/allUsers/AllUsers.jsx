import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsersAction } from '../../features/users/usersSlice'
import { Link } from 'react-router-dom'

const AllUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(store => store.users)

  useEffect(() => {
    dispatch(setUsersAction())
  }, [dispatch])

  return (
    <div>
      <h1>Users</h1>
      <table style={{ width: 300 }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
