import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = async (newToken) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token,
  },
});

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const createBlog = async (newBlog) => {
  const { data } = await axios.post(baseUrl, newBlog, getConfig());
  return data;
};

const updateBlog = async (blogUpdated, blogId) => {
  const { data } = await axios.put(`${baseUrl}/${blogId}`, blogUpdated, getConfig());
  return data;
};

const deleteBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, getConfig());
  return response;
};

export default { getAll, setToken, createBlog, updateBlog, deleteBlog };
