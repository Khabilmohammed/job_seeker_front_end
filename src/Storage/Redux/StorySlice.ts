import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story as StoryInterface } from '../../Interfaces/Story'; 


interface StoryState {
  stories: StoryInterface[];
  loading?: boolean; // Optional loading state
  error: string | null;
}

const initialState: StoryState = {
  stories: [],
  loading: false, // Initialize loading state
  error: null,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStories(state, action: PayloadAction<StoryInterface[]>) {
      state.stories = action.payload;
    },
     addStory(state, action: PayloadAction<StoryInterface>) {
      state.stories.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    fetchStoriesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deleteStoryFromState(state, action: PayloadAction<number>) {
      state.stories = state.stories.filter(story => story.storyId !== action.payload);
    },
  },
});

export const { setStories,addStory, fetchStoriesFailure,deleteStoryFromState,setLoading, setError  } = storySlice.actions;

export default storySlice.reducer;
