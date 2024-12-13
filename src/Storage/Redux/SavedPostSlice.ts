import { createSlice } from "@reduxjs/toolkit";
import { SavedPostModel } from "../../Interfaces/index";

// Define the initial state for saved posts
export const initialSavedPostState: SavedPostModel[] = [];

// Create the SavedPostSlice
export const SavedPostSlice = createSlice({
  name: "savedPosts",
  initialState: initialSavedPostState,
  reducers: {
    setSavedPosts: (state, action) => {
      return action.payload; // Set the saved posts list
    },
    addSavedPost: (state, action) => {
      state.push(action.payload); // Add a new saved post
    },
    removeSavedPost: (state, action) => {
      return state.filter((savedPost: any) => savedPost.savedPostId !== action.payload); // Remove the saved post
    },
    resetSavedPosts: () => {
      return initialSavedPostState; // Reset the state to the initial value
    },
  },
});

// Export the actions and reducer
export const { setSavedPosts, addSavedPost, removeSavedPost, resetSavedPosts } = SavedPostSlice.actions;
export const savedPostReducer = SavedPostSlice.reducer;
