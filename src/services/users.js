import axios from 'axios'

const baseUrl = '/api/users'

const getAllUsers = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export default { getAllUsers }
