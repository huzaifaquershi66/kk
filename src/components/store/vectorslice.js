import { createSlice } from '@reduxjs/toolkit';


// Load vectors from localStorage
const loadVectorsFromLocalStorage = () => {
  try {
    const storedVectors = localStorage.getItem('vectors');
    return storedVectors ? JSON.parse(storedVectors) : []; // Return empty array if not found
  } catch (error) {
    console.error('Failed to load vectors from localStorage:', error);
    return [];
  }
};

const vectorSlice = createSlice({
  name: 'vector',
  initialState: {
    vectors: loadVectorsFromLocalStorage(),
  },
  reducers: {
    addOrder(state, action) {  // Changed from addOrder to addVector
      state.vectors.push(action.payload);
      localStorage.setItem('vectors', JSON.stringify(state.vectors)); // Update localStorage
    },
    updatevectorRushStatus: (state, action) => {
      const vectorId = action.payload;
      const vector = state.vectors.find(vector => vector.id === vectorId);
      if (vector) {
        vector.isRush = !vector.isRush; // Toggle the rush status
        localStorage.setItem('vectors', JSON.stringify(state.vectors)); // Update localStorage
      }
    },
    loadVectors: (state, action) => {
      state.vectors = action.payload; // Load vectors from payload
    },
  },
});

// Thunk to fetch vectors
export const fetchVectors = () => (dispatch) => {
  const vectors = loadVectorsFromLocalStorage();
  dispatch(loadVectors(vectors)); // Dispatch action to load vectors
};

// Export actions and reducer
export const { addOrder, updatevectorRushStatus, loadVectors } = vectorSlice.actions;
export default vectorSlice.reducer;
