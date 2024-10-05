import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }
);

// Add this new action
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

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    
    status: 'idle',
    error: null,
  },
  reducers: {},
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

export default productsSlice.reducer;