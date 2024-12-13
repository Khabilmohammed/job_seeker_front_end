import { createSlice } from "@reduxjs/toolkit";
import { LikeModel } from "../../Interfaces/index"; // Define this interface as needed

export const initialLikeState: LikeModel[] = [];

export const LikeSlice = createSlice({
  name: "likes",
  initialState: initialLikeState,
  reducers: {
    setLikes: (state, action) => {
      return action.payload; 
    },
    addLike: (state, action) => {
      state.push(action.payload); 
    },
    removeLike: (state, action) => {
      return state.filter((like:any) => like.likeId !== action.payload);
    },
    resetLikes: (state) => {
      return initialLikeState;
    },
  },
});

export const { setLikes, addLike, removeLike, resetLikes } = LikeSlice.actions;
export const likeReducer = LikeSlice.reducer;
