import { configureStore, createSlice } from '@reduxjs/toolkit'

// User Authentication Slice

const userAuthSlice = createSlice({
  name: 'userAuthentication',
  initialState: {
    token: null,
    rememberUser: false, 
    userProfile: null, 
    error: null, 
  },
  reducers: {
    storeAuthToken: (state, action) => {
      state.token = action.payload.token;
      state.rememberUser = true;
    },
    clearRememberedUser: (state) => {
      state.token = null;
      state.rememberUser = false;
      state.userProfile = null; 
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload; 
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  }
})

// Export actions for use in components
export const {
  storeAuthToken,
  clearRememberedUser,
  setUserProfile,
  setAuthError
} = userAuthSlice.actions;


// Configure Redux store with the user authentication reducer
export const store = configureStore({
  reducer: {
    userAuthentication: userAuthSlice.reducer
  }
});