import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = async newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const createBlog = async newBlog => {
  const { data } = await axios.post(baseUrl, newBlog, config)
  return data
}

const updateBlog = async (blogUpdated, blogId) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data } = await axios.put(`${baseUrl}/${blogId}`, blogUpdated, config)
  return data
}

export default { getAll, setToken, createBlog, updateBlog }
