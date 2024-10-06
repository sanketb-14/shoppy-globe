import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Creates an async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }
);

// Creates an async thunk to filter products by category
export const filterProductsByCategory = createAsyncThunk(
  'products/filterProductsByCategory',
  async (category) => {
    if (category === 'All') {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      return data.products;
    } else {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();
      return data.products;
    }
  }
);

// Creates a slice for products with initial state and extra reducers
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedCategory: 'All', // Add this line
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  
  // Handles different states of async operations
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(filterProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(filterProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = productsSlice.actions; 
export default productsSlice.reducer;