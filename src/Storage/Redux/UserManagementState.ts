import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

interface UserManagementState {
    users: userModel[];
    loading: boolean;
    error: string | null;
}

const initialState: UserManagementState = {
    users: [],
    loading: false,
    error: null,
};

export const userManagementSlice = createSlice({
    name: "userManagement",
    initialState,
    reducers: {
        fetchUsersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<userModel[]>) {
            state.loading = false;
            state.users = action.payload;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addUser(state, action: PayloadAction<userModel>) {
            state.users.push(action.payload);
        },
        editUser(state, action: PayloadAction<userModel>) {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    addUser,
    editUser,
    deleteUser,
} = userManagementSlice.actions;

export const userManagementReducer = userManagementSlice.reducer;
