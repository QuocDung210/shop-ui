import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import productsReducer from './slices/product';

export default configureStore({
    reducer: {
        search: searchReducer,
        product: productsReducer,
    },
});
