import { configureStore, createSlice } from '@reduxjs/toolkit'

// User Authentication Slice

const userAuthSlice = createSlice({
  name: 'userAuthentication',
  initialState: {},
  reducers: {
    // Store authentication token and set remember me flag
    storeAuthToken: (state, action) => {
      state.token = action.payload.token
      state.rememberUser = true
    },
    // Handle authentication failure or logout
    clearRememberedUser: (state) => {
      state.token = null
      state.rememberUser = false
    },
  }
})

// Export actions for use in components
export const {
  storeAuthToken,
  clearRememberedUser
} =  userAuthSlice.actions

// Configure Redux store with the user authentication reducer
export const store = configureStore({
  reducer: {
    userAuthentication: userAuthSlice.reducer
  }
})