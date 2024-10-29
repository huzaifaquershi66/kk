// // src/store/authSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { auth } from '../../firebase'; // Import Firebase auth
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: { user: null, error: null },
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     }
//   }
// });

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// export const login = (email, password) => async (dispatch) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     dispatch(loginSuccess(userCredential.user));
//   } catch (error) {
//     dispatch(loginFailure(error.message));
//   }
// };

// export const signup = (email, password) => async (dispatch) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     dispatch(loginSuccess(userCredential.user));
//   } catch (error) {
//     dispatch(loginFailure(error.message));
//   }
// };

// export default authSlice.reducer;
