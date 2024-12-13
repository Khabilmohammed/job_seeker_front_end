import { createSlice } from "@reduxjs/toolkit";
import { PostModel } from "../../Interfaces/index";

export const initialPostState: PostModel[] = [];

export const PostSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {
    setPosts: (state, action) => {
      return action.payload; 
    },
    addPost: (state, action) => {
      state.push(action.payload); 
    },
    updatePost: (state, action) => {
      const index = state.findIndex((post) => post.postId === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.postId !== action.payload); 
    },
    resetPosts: (state) => {
      return initialPostState; 
    },
  },
});

export const { setPosts, addPost, updatePost, deletePost, resetPosts } = PostSlice.actions;
export const postReducer = PostSlice.reducer;
