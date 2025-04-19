import { Todo } from "../types/todo"

// Get todos from localStorage
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const savedTodos = await localStorage.getItem("todos")
    if (savedTodos) {
      return JSON.parse(savedTodos)
    }
    return []
  } catch (error) {
    console.error("Failed to get todos from localStorage:", error)
    return []
  }
}

// Save todos to localStorage
export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    await localStorage.setItem("todos", JSON.stringify(todos))
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error)
    throw error
  }
}

// Get deleted todos from localStorage
export const getDeletedTodos = async (): Promise<Todo[]> => {
  try {
    const savedDeletedTodos = await localStorage.getItem("deletedTodos")
    if (savedDeletedTodos) {
      return JSON.parse(savedDeletedTodos)
    }
    return []
  } catch (error) {
    console.error("Failed to get deleted todos from localStorage:", error)
    return []
  }
}

// Save deleted todos to localStorage
export const saveDeletedTodos = async (deletedTodos: Todo[]): Promise<void> => {
  try {
    await localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos))
  } catch (error) {
    console.error("Failed to save deleted todos to localStorage:", error)
    throw error
  }
}

// Get a single todo by ID
export const getTodoById = async (id: string): Promise<Todo | undefined> => {
  try {
    const todos = await getTodos()
    return todos.find((todo) => todo.id === id)
  } catch (error) {
    console.error("Failed to get todo by ID:", error)
    return undefined
  }
}

// Add a new todo
export const addTodo = async (text: string): Promise<void> => {
  if (!text.trim()) return

  try {
    const todos = await getTodos()
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now().toString(),
    }

    await saveTodos([...todos, newTodo])
  } catch (error) {
    console.error("Failed to add todo:", error)
    throw error
  }
}

// Update a todo
export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<void> => {
  try {
    const todos = await getTodos()
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))

    await saveTodos(updatedTodos)
  } catch (error) {
    console.error("Failed to update todo:", error)
    throw error
  }
}

// Toggle todo completion status
export const toggleTodo = async (id: string): Promise<void> => {
  try {
    const todos = await getTodos()
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))

    await saveTodos(updatedTodos)
  } catch (error) {
    console.error("Failed to toggle todo:", error)
    throw error
  }
}

// Delete a todo (move to trash)
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const todos = await getTodos()
    const todoToDelete = todos.find((todo) => todo.id === id)

    if (todoToDelete) {
      const updatedTodos = todos.filter((todo) => todo.id !== id)
      await saveTodos(updatedTodos)

      const deletedTodos = await getDeletedTodos()
      await saveDeletedTodos([...deletedTodos, todoToDelete])
    }
  } catch (error) {
    console.error("Failed to delete todo:", error)
    throw error
  }
}

// Permanently delete a todo from trash
export const permanentlyDeleteTodo = async (id: string): Promise<void> => {
  try {
    const deletedTodos = await getDeletedTodos()
    const updatedDeletedTodos = deletedTodos.filter((todo) => todo.id !== id)
    await saveDeletedTodos(updatedDeletedTodos)
  } catch (error) {
    console.error("Failed to permanently delete todo:", error)
    throw error
  }
}

// Restore a todo from trash
export const restoreTodo = async (id: string): Promise<void> => {
  try {
    const deletedTodos = await getDeletedTodos()
    const todoToRestore = deletedTodos.find((todo) => todo.id === id)

    if (todoToRestore) {
      const updatedDeletedTodos = deletedTodos.filter((todo) => todo.id !== id)
      await saveDeletedTodos(updatedDeletedTodos)

      const todos = await getTodos()
      await saveTodos([...todos, todoToRestore])
    }
  } catch (error) {
    console.error("Failed to restore todo:", error)
    throw error
  }
}
