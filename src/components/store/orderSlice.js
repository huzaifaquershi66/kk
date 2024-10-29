// // src/slices/orderSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { db } from '../../firebase'; // Import your Firestore database instance
// import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

// const orderSlice = createSlice({
//   name: 'order',
//   initialState: {
//     orders: [], // Start with an empty array for orders
//   },
//   reducers: {
//     setOrders(state, action) {
//       state.orders = action.payload; // Set orders from payload
//     },
//     addOrder(state, action) {
//       state.orders.push(action.payload); // Add order to the state
//     },
//     updateOrderRushStatus(state, action) {
//       const { orderId } = action.payload;
//       const order = state.orders.find(order => order.id === orderId);
//       if (order) {
//         order.isRush = !order.isRush; // Toggle the rush status
//       }
//     },
//   },
// });

// // Thunk to fetch orders from Firestore
// export const fetchOrders = () => async (dispatch) => {
//   try {
//     const ordersSnapshot = await getDocs(collection(db, 'orders'));
//     const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     dispatch(setOrders(ordersList)); // Dispatch setOrders action with fetched orders
//   } catch (error) {
//     console.error('Error fetching orders from Firestore:', error);
//   }
// };

// // Thunk to add an order to Firestore
// export const createOrder = (order) => async (dispatch) => {
//   try {
//     const docRef = await addDoc(collection(db, 'orders'), order);
//     dispatch(addOrder({ id: docRef.id, ...order })); // Dispatch addOrder action with new order
//   } catch (error) {
//     console.error('Error adding order to Firestore:', error);
//   }
// };

// // Thunk to update order's rush status in Firestore
// export const toggleOrderRushStatus = (orderId) => async (dispatch, getState) => {
//   const order = getState().order.orders.find(order => order.id === orderId);
//   if (order) {
//     try {
//       const orderDocRef = doc(db, 'orders', orderId);
//       await updateDoc(orderDocRef, { isRush: !order.isRush }); // Toggle the rush status in Firestore
//       dispatch(updateOrderRushStatus({ orderId })); // Dispatch updateOrderRushStatus action
//     } catch (error) {
//       console.error('Error updating order rush status:', error);
//     }
//   }
// };

// export const { setOrders, addOrder, updateOrderRushStatus } = orderSlice.actions;
// export default orderSlice.reducer;
