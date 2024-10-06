import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      addToCart: (state, action) => {
        // Adds item to cart or increases quantity if already exists
        const existingItem = state.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.push({ ...action.payload, quantity: 1 });
        }
      },
      removeFromCart: (state, action) => {
        // Removes item from cart by id
        return state.filter(item => item.id !== action.payload);
      },
      updateQuantity: (state, action) => {
        // Updates quantity of a specific item in cart
        const { id, quantity } = action.payload;
        const item = state.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      },
      clearCart: () => {
        // Clears all items from cart
        return [];
      },
    },
  });
  
  export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;