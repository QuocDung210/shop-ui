import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        //Login
        startLogin: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        //Register
        startRegister: (state) => {
            state.login.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        registerFailed: (state) => {
            state.login.error = true;
        },
        //Logout
        startLogout: (state) => {
            state.logout.isFetching = true;
        },

        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },

        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
    },
});

export const {
    startLogin,
    loginSuccess,
    loginFailed,
    startRegister,
    registerFailed,
    registerSuccess,
    startLogout,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
