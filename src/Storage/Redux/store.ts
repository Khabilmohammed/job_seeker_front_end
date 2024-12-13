import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi, likeApi, postApi, userManagementApi } from "../../Apis";
import { userAuthReducer } from "./UserAuthSlice";
import { postReducer } from "./PostSlice";
import { userManagementReducer } from "../Redux/UserManagementState";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import { storyApi } from "../../Apis/storyApi";
import storyReducer from './StorySlice';
import { likeReducer } from "./LikeSlice";
import commentApi from "../../Apis/commentApi";
import savedPostApi from "../../Apis/savedPostApi";
import { savedPostReducer } from "./SavedPostSlice";
import experienceApi from "../../Apis/experienceApi";
import certificateApi from "../../Apis/certificateApi";
import educationApi from "../../Apis/educationApi";
import companyApi from "../../Apis/companyApi";
import jobPostingApi from "../../Apis/jobPostingApi";
import paymentApi from "../../Apis/paymentApi";
import jobApplicationApi from "../../Apis/jobApplicationApi";
import followApi from "../../Apis/followApi";
import messageApi from "../../Apis/messageApi";
import { dashboardApi } from "../../Apis/dashboardApi ";

const rootReducer = combineReducers({
  userAuthStore: userAuthReducer,
  postStore: postReducer,
  userManagementStore: userManagementReducer,
  storyStore: storyReducer,
  likeStore: likeReducer,
  commentStore: commentApi.reducer,
  savedPostStore: savedPostReducer,
  [storyApi.reducerPath]: storyApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [userManagementApi.reducerPath]: userManagementApi.reducer,
  [likeApi.reducerPath]: likeApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [savedPostApi.reducerPath]: savedPostApi.reducer,
  [experienceApi.reducerPath]: experienceApi.reducer,
  [certificateApi.reducerPath]: certificateApi.reducer,
  [educationApi.reducerPath]: educationApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [jobPostingApi.reducerPath]: jobPostingApi.reducer,
  [followApi.reducerPath]: followApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [jobApplicationApi.reducerPath]: jobApplicationApi.reducer,
});

// Configuration for persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userAuthStore",
     "postStore", 
     "userManagementStore",
     "storyStore",
     "likeStore",
     "commentStore"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore persist actions
      },
    })
      .concat(authApi.middleware)
      .concat(postApi.middleware)
      .concat(storyApi.middleware)
      .concat(userManagementApi.middleware)
      .concat(likeApi.middleware)
      .concat(commentApi.middleware)
      .concat(savedPostApi.middleware)
      .concat(experienceApi.middleware)
      .concat(certificateApi.middleware)
      .concat(educationApi.middleware)
      .concat(jobPostingApi.middleware)
      .concat(paymentApi.middleware)
      .concat(jobApplicationApi.middleware)
      .concat(followApi.middleware)
      .concat(messageApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(companyApi.middleware)
});

export const persistor = persistStore(store);

export type Rootstate = ReturnType<typeof store.getState>;

export default store;
