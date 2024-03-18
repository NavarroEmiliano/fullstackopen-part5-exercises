import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../../services/blogs'
import { setNotificationAction } from '../notification/notificationSlice'

const initialState = []

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setState: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) => {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog: (state, action) =>
      state.filter(blog => blog.id !== action.payload)
  }
})

export const { setState, addBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => async dispatch => {
  const notes = await blogServices.getAll()
  dispatch(setState(notes))
}

export const createBlogAction = newBlog => async dispatch => {
  try {
    const blog = await blogServices.createBlog(newBlog)
    dispatch(addBlog(blog))
  } catch (error) {
    dispatch(
      setNotificationAction({
        message: error.response.data.error,
        type: 'error'
      })
    )
  }
}

export const updateBlogAction = (blog, blogId) => async dispatch => {
  const updatedBlog = await blogServices.updateBlog(blog, blogId)
  dispatch(updateBlog(updatedBlog))
}

export const deleteBlogAction = blogId => async dispatch => {
  await blogServices.deleteBlog(blogId)
  dispatch(deleteBlog(blogId))
}

export default blogSlice.reducer
