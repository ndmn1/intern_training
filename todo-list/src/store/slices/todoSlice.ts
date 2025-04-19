import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo, Category, Priority } from "../../types/todo";
import * as todoStorage from "../../utils/todoStorage";

interface TodoState {
  todos: Todo[];
  deletedTodos: Todo[];
  isLoading: boolean;
  error: string | null;
  currentTodo: Todo | null;
}

// Async thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await todoStorage.getTodos();
});

export const fetchDeletedTodos = createAsyncThunk(
  "todos/fetchDeletedTodos",
  async () => {
    return await todoStorage.getDeletedTodos();
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({
    text,
    category,
    priority,
  }: {
    text: string;
    category: Category;
    priority: Priority;
  }) => {
    const currentTodos = await todoStorage.getTodos();
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      category,
      priority,
    };
    await todoStorage.saveTodos([newTodo, ...currentTodos]);
    return newTodo;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updates }: { id: string; updates: Partial<Todo> }) => {
    await todoStorage.updateTodo(id, updates);
    return { id, updates };
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    await todoStorage.deleteTodo(id);
    return id;
  }
);

export const restoreTodo = createAsyncThunk(
  "todos/restoreTodo",
  async (id: string) => {
    const deletedTodos = await todoStorage.getDeletedTodos();
    const todoToRestore = deletedTodos.find((todo) => todo.id === id);
    if (!todoToRestore) throw new Error("Todo not found");
    
    await todoStorage.restoreTodo(id);
    return todoToRestore;
  }
);

export const permanentlyDeleteTodo = createAsyncThunk(
  "todos/permanentlyDeleteTodo",
  async (id: string) => {
    await todoStorage.permanentlyDeleteTodo(id);
    return id;
  }
);

export const resetTodo = createAsyncThunk(
  "todos/resetTodo",
  async (todo: Todo) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    await todoStorage.resetTodo(todo);
    return newTodo;
  }
);

export const getTodoById = createAsyncThunk(
  "todos/getTodoById",
  async (id: string) => {
    const todo = await todoStorage.getTodoById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }
);

// Slice
const initialState: TodoState = {
  todos: [],
  deletedTodos: [],
  isLoading: false,
  error: null,
  currentTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })

      // Fetch deleted todos
      .addCase(fetchDeletedTodos.fulfilled, (state, action) => {
        state.deletedTodos = action.payload;
      })

      // Add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })

      // Update todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const todoIndex = state.todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          state.todos[todoIndex] = { ...state.todos[todoIndex], ...updates };
        }
      })

      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const todoToDelete = state.todos.find((todo) => todo.id === action.payload);
        if (todoToDelete) {
          state.todos = state.todos.filter((todo) => todo.id !== action.payload);
          todoToDelete.deletedAt = new Date().toISOString();
          state.deletedTodos.unshift(todoToDelete);
        }
      })

      // Restore todo
      .addCase(restoreTodo.fulfilled, (state, action) => {
        state.deletedTodos = state.deletedTodos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.todos.unshift(action.payload);
      })

      // Permanently delete todo
      .addCase(permanentlyDeleteTodo.fulfilled, (state, action) => {
        state.deletedTodos = state.deletedTodos.filter(
          (todo) => todo.id !== action.payload
        );
      })

      // Reset todo
      .addCase(resetTodo.fulfilled, (state, action) => {
        if (!action.meta.arg.completed) {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.meta.arg.id
          );
        }
        state.todos.unshift(action.payload);
      })

      // Get todo by id
      .addCase(getTodoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentTodo = null;
      })
      .addCase(getTodoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTodo = action.payload;
      })
      .addCase(getTodoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch todo";
        state.currentTodo = null;
      });
  },
});

export default todoSlice.reducer; 