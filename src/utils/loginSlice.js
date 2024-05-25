import { createSlice } from "@reduxjs/toolkit";
import loginHandler from "../utils/loginServices";

export const loginSlice = createSlice({
    name: "cart",
    initialState: {
        productStatus: '',
        loginToken: null,
        userDetails: null,
    },
    reducers: {
        logoutHandler: (state) => {
            state.loginToken = null;
            state.userDetails = null;
            localStorage.removeItem('user')
        },
        updateLoginDetails: (state, action) => {
            state.userDetails = action.payload;
            state.loginToken = action.payload?.token;
        },

    },
    extraReducers: {
        [loginHandler.pending]: (state) => {
            state.productStatus = "pending";
        },
        [loginHandler.fulfilled]: (state, action) => {
            state.userDetails = action.payload;
            state.loginToken = action.payload?.token;
            state.productStatus = "success";
        },
        [loginHandler.rejected]: (state) => {
            state.productStatus = "rejected";
        }
    },

});

export const { logoutHandler, updateLoginDetails } = loginSlice.actions;

export default loginSlice.reducer;      