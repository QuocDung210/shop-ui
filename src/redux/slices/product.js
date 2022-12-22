import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        error: null,
        products: [],
        totalRows: null,
        sortBy: null,
        totalPage: 1,
        filters: {
            page: 1,
            priceMin: null,
            priceMax: null,
        },
    },
    reducers: {
        //Start loading
        startLoading: (state) => {
            state.isLoading = true;
        },

        //has error
        hasError: (state) => {
            state.isLoading = false;
            state.error = true;
        },

        //set products
        setProducts: (state, action) => {
            state.products = action.payload;
        },

        //get product
        getProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = false;
            state.totalPage = 100;
            state.totalRows = 4;
        },
    },
});

export const productsActions = slice.actions;
const productsReducer = slice.reducer;
export default productsReducer;
