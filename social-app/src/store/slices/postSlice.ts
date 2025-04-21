import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Post } from "@/types"
import { axiosClient } from "@/api/axiosClient"

interface PostState {
  post: Post | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

export const fetchPostById = createAsyncThunk("post/fetchPostById", async (postId: number) => {
  const response = await axiosClient.get(`/posts/${postId}`)
  return response.data
})

const initialState: PostState = {
  post: null,
  status: "idle",
  error: null,
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = "succeeded"
        state.post = action.payload
        state.error = null
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch post"
      })
  },
})

export default postSlice.reducer
