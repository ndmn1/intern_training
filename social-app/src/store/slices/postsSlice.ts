import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Post } from "@/types"
import { axiosClient } from "@/api/axiosClient"

interface PostsState {
  posts: Post[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  totalCount: number
}

interface FetchPostsParams {
  page: number
  limit: number
  userId?: string
}

interface CreatePostData {
  title: string
  body: string
  userId: number
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({ page, limit, userId }: FetchPostsParams) => {
  const start = (page - 1) * limit
  let url = `/posts?_start=${start}&_limit=${limit}`

  if (userId) {
    url = `/posts?userId=${userId}`
  }

  const response = await axiosClient.get(url)
  return {
    posts: response.data,
    totalCount: Number.parseInt(response.headers["x-total-count"] || "0"),
  }
})

export const fetchPostsByUserId = createAsyncThunk("posts/fetchPostsByUserId", async (userId: number) => {
  const response = await axiosClient.get(`/posts?userId=${userId}`)
  return response.data
})

export const createPost = createAsyncThunk("posts/createPost", async (postData: CreatePostData) => {
  const response = await axiosClient.post("/posts", postData)
  return response.data
})

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
  totalCount: 0,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<{ posts: Post[]; totalCount: number }>) => {
        state.status = "succeeded"
        state.posts = action.payload.posts
        state.totalCount = action.payload.totalCount
        state.error = null
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch posts"
      })
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded"
        state.posts = action.payload
        state.error = null
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch posts"
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = "succeeded"
        // In a real app, we might add the new post to the state
        // But since JSONPlaceholder doesn't actually save it, we'll just acknowledge success
        state.error = null
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to create post"
      })
  },
})

export default postsSlice.reducer
