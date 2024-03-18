import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationAction = message => dispatch => {
  dispatch(setNotification(message))
  setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}

export default notificationSlice.reducer
