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
      if (Array.isArray(action.payload)) { 
        state.stories = action.payload;
      }
      state.error = null;
    },
    fetchStoriesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deleteStoryFromState(state, action: PayloadAction<number>) {
      state.stories = state.stories.filter(story => story.storyId !== action.payload);
    },
  },
});

export const { fetchStoriesSuccess, fetchStoriesFailure,deleteStoryFromState } = storySlice.actions;

export default storySlice.reducer;
