import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "./slices/postsSlice"
import postReducer from "./slices/postSlice"
import commentsReducer from "./slices/commentsSlice"
import usersReducer from "./slices/usersSlice"

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
