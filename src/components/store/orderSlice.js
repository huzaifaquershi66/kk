import { createSlice } from '@reduxjs/toolkit';

// Load orders from localStorage
const loadOrdersFromLocalStorage = () => {
  try {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : []; // Return empty array if not found
  } catch (error) {
    console.error('Failed to load orders from localStorage:', error);
    return [];
  }
};

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: loadOrdersFromLocalStorage(),
  },
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    updateOrderRushStatus: (state, action) => {
      const { orderId } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.isRush = !order.isRush; // Toggle the rush status
        localStorage.setItem('orders', JSON.stringify(state.orders)); // Update localStorage
      }
    },
    loadOrders: (state, action) => {
      state.orders = action.payload; // Set orders from payload
    },
  },
});

// Thunk to fetch orders
export const fetchOrders = () => (dispatch) => {
  const orders = loadOrdersFromLocalStorage();
  dispatch(loadOrders(orders)); // Dispatch loadOrders action with fetched orders
};

export const { addOrder, updateOrderRushStatus, loadOrders } = orderSlice.actions;
export default orderSlice.reducer;
