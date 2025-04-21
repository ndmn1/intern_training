import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Comment } from "@/types"
import { axiosClient } from "@/api/axiosClient"

interface CommentsState {
  comments: Comment[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

export const fetchCommentsByPostId = createAsyncThunk("comments/fetchCommentsByPostId", async (postId: number) => {
  const response = await axiosClient.get(`/comments?postId=${postId}`)
  return response.data
})

const initialState: CommentsState = {
  comments: [],
  status: "idle",
  error: null,
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.status = "succeeded"
        state.comments = action.payload
        state.error = null
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch comments"
      })
  },
})

export default commentsSlice.reducer
