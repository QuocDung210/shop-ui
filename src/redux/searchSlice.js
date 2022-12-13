const { createSlice } = require('@reduxjs/toolkit');

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: {
            searchRes: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        searchStart: (state) => {
            state.search.isFetching = true;
        },
        searchSuccess: (state, action) => {
            state.search.isFetching = false;
            state.search.searchRes = action.payload;
            state.search.error = false;
        },
        searchFailed: (state) => {
            state.search.isFetching = false;
            state.search.error = true;
        },
    },
});

export const { searchStart, searchSuccess, searchFailed } = searchSlice.actions;

export default searchSlice.reducer;
