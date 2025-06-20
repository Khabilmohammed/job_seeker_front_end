import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { SavedPostModel } from "../../Interfaces";

// Define the initial state for saved posts
interface SavedPostState {
  savedPosts: SavedPostModel[];
  loading: boolean;
  error: string | null;
}

const initialState: SavedPostState = {
  savedPosts: [],
  loading: false,
  error: null,
};

// Create the SavedPostSlice
export const SavedPostSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
     setSavedPosts(state, action: PayloadAction<SavedPostModel[]>) {
      state.savedPosts = action.payload;
    },
     addSavedPost(state, action: PayloadAction<SavedPostModel>) {
      state.savedPosts.push(action.payload);
    },
     removeSavedPostFromRedux: (state, action: PayloadAction<number>) => {
      state.savedPosts = state.savedPosts.filter(p => p.postId !== action.payload);
    },
    fetchSavedPostsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setSavedPosts, addSavedPost, removeSavedPostFromRedux,fetchSavedPostsFailure  } = SavedPostSlice.actions;
export const savedPostReducer = SavedPostSlice.reducer;
