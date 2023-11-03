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
    // Stores JWT token and sets user as remembered in state.
    storeAuthToken: (state, action) => {
      state.token = action.payload.token;
      state.rememberUser = true;
    },
    // Clears authentication token and user profile from state, effectively logging user out.
    clearRememberedUser: (state) => {
      state.token = null;
      state.rememberUser = false;
      state.userProfile = null; 
    },
    // Sets user profile data in state with data provided in action payload.
    setUserProfile: (state, action) => {
      state.userProfile = action.payload; 
    },
    // Sets an error message in state, which can be used to show error messages in UI.
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    // Updates user profile data in state with new data provided in action payload.
    updateUserProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
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