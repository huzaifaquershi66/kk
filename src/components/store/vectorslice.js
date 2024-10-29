// src/slices/vectorSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../firebase'; // Import your Firestore database instance
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const vectorSlice = createSlice({
  name: 'vector',
  initialState: {
    vectors: [], // Start with an empty array for vectors
  },
  reducers: {
    setVectors(state, action) {
      state.vectors = action.payload; // Set vectors from payload
    },
    addVector(state, action) { // Changed from addOrder to addVector
      state.vectors.push(action.payload); // Add vector to the state
    },
    updateVectorRushStatus(state, action) {
      const { vectorId } = action.payload; // Expecting an object with vectorId
      const vector = state.vectors.find(vector => vector.id === vectorId);
      if (vector) {
        vector.isRush = !vector.isRush; // Toggle the rush status
      }
    },
  },
});

// Thunk to fetch vectors from Firestore
export const fetchVectors = () => async (dispatch) => {
  try {
    const vectorsSnapshot = await getDocs(collection(db, 'vectors'));
    const vectorsList = vectorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setVectors(vectorsList)); // Dispatch setVectors action with fetched vectors
  } catch (error) {
    console.error('Error fetching vectors from Firestore:', error);
  }
};

// Thunk to add a vector to Firestore
export const createVector = (vector) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, 'vectors'), vector);
    dispatch(addVector({ id: docRef.id, ...vector })); // Dispatch addVector action with new vector
  } catch (error) {
    console.error('Error adding vector to Firestore:', error);
  }
};

// Thunk to update vector's rush status in Firestore
export const toggleVectorRushStatus = (vectorId) => async (dispatch, getState) => {
  const vector = getState().vector.vectors.find(vector => vector.id === vectorId);
  if (vector) {
    try {
      const vectorDocRef = doc(db, 'vectors', vectorId);
      await updateDoc(vectorDocRef, { isRush: !vector.isRush }); // Toggle the rush status in Firestore
      dispatch(updateVectorRushStatus({ vectorId })); // Dispatch updateVectorRushStatus action
    } catch (error) {
      console.error('Error updating vector rush status:', error);
    }
  }
};

export const { setVectors, addVector, updateVectorRushStatus } = vectorSlice.actions;
export default vectorSlice.reducer;
