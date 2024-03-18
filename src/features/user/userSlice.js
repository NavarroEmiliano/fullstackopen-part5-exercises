import { createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'
import blogService from '../../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    logoutUser: () => null
  }
})

export const { setUser, logoutUser } = userSlice.actions

export const loginUserAction = credentials => async dispatch => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  blogService.setToken(user.token)
  dispatch(setUser(user))
}

export default userSlice.reducer
