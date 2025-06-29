import { createSlice } from "@reduxjs/toolkit";

interface IAccountState {
    id: string;
    name: string;
    isLogin: boolean;
}

const initialState: IAccountState = {
    id: "",
    name: "",
    isLogin: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.isLogin = action.payload.isLogin;
        },

    }
});

export const { login } = accountSlice.actions;
export default accountSlice.reducer;