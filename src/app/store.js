import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../features/blogs/blogsSlice'
import userReducer from '../features/user/userSlice'
import notificationReducer from '../features/notification/notificationSlice'

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer
  }
})
