import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    items: [],
    user: null,
    isOrderPlaced: false
  },
  reducers: {
    placeOrder: (state, action) => {
      state.items = action.payload.items;
      state.user = action.payload.user;
      state.isOrderPlaced = true;
    },
    clearOrder: (state) => {
      state.items = [];
      state.user = null;
      state.isOrderPlaced = false;
    }
  }
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

// createSlice: Creates a slice of the Redux store with reducers and actions
// placeOrder: Updates state with order details and marks order as placed
// clearOrder: Resets the order state to initial values
// Export: Exports individual action creators and the reducer