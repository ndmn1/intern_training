import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "@/types"
import { axiosClient } from "@/api/axiosClient"

interface UsersState {
  users: User[]
  user: User | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (userId: number) => {
  const response = await axiosClient.get(`/users/${userId}`)
  return response.data
})

export const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async () => {
  const response = await axiosClient.get("/users")
  return response.data
})

const initialState: UsersState = {
  users: [],
  user: null,
  status: "idle",
  error: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded"
        state.user = action.payload

        // Add user to users array if not already present
        if (!state.users.find((user) => user.id === action.payload.id)) {
          state.users.push(action.payload)
        }

        state.error = null
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch user"
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded"
        state.users = action.payload
        state.error = null
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch users"
      })
  },
})

export default usersSlice.reducer
