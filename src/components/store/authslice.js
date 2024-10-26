import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: Array.isArray(JSON.parse(localStorage.getItem('users'))) ? 
         JSON.parse(localStorage.getItem('users')) : [], // Ensure users is an array
  currentUser: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      state.currentUser = user;
      state.isAuthenticated = true;

      // Check if the user is already in the user array
      const userExists = state.user.find(existingUser => existingUser.id === user.id);
      if (!userExists) {
        state.user.push(user); // Add new user to user array
      }

      // Save users to localStorage
      localStorage.setItem('users', JSON.stringify(state.user));
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      
      console.log("Users after login:", state.user); // Debugging log
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('currentUser'); // Remove current user from localStorage
    },
    setAllUsers: (state, action) => {
      // Set all users from payload or localStorage as a fallback
      const allUsers = action.payload || JSON.parse(localStorage.getItem('users')) || [];
      state.user = allUsers;
      console.log("All users set:", state.user); // Debugging log
    },
  },
});

export const { login, logout, setAllUsers } = authSlice.actions;
export default authSlice.reducer;
