import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productReducer from './features/productSlice';
import orderReducer from './features/orderSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    order: orderReducer,
  },
});

export default store;