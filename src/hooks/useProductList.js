import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterProductsByCategory, setSelectedCategory } from '../redux/features/productSlice';

export const useProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error, selectedCategory } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(filterProductsByCategory(category));
  };

  return { 
    products: items, 
    status, 
    error, 
    selectedCategory,
    handleCategoryChange 
  };
};