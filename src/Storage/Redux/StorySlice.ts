// store/StorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story as StoryInterface } from '../../Interfaces/Story'; 


interface StoryState {
  stories: StoryInterface[];
  error: string | null;
}

const initialState: StoryState = {
  stories: [],
  error: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    fetchStoriesSuccess: (state, action: PayloadAction<StoryInterface[]>) => {
      if (Array.isArray(action.payload)) { // Check if payload is an array
        state.stories = action.payload;
      }
      state.error = null;
    },
    fetchStoriesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fetchStoriesSuccess, fetchStoriesFailure } = storySlice.actions;

export default storySlice.reducer;
