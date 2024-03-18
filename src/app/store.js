import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../features/blogs/blogsSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: { blogs: blogReducer, user: userReducer }
})
