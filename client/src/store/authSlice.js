import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;  // Store user data from payload
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;  // Clear user data on logout
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
