import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import TodoList from "../../components/todo/TodoList";
import TodoFilter from "../../components/todo/TodoFilter";
import { Todo } from "../../types/todo";
import * as constants from "@/constants/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchTodos,
  updateTodo,
  deleteTodo,
  resetTodo,
} from "../../store/slices/todoSlice";

type FilterType = "all" | "active" | "completed";

export default function HomePage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector((state) => state.todos);
  const [filter, setFilter] = useState<FilterType>("all");

  // Load todos from Redux store on initial render
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Handle toggle todo
  const handleToggleTodo = async (id: string): Promise<void> => {
    try {
      await dispatch(
        updateTodo({
          id,
          updates: {
            completed: !todos.find((todo) => todo.id === id)?.completed,
          },
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  // Handle delete todo
  const handleDeleteTodo = async (id: string): Promise<void> => {
    try {
      await dispatch(deleteTodo(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  // Handle reset todo
  const handleReset = async (todo: Todo) => {
    try {
      await dispatch(resetTodo(todo)).unwrap();
    } catch (err) {
      console.error("Failed to reset todo:", err);
    }
  };

  // Get filtered todos based on current filter
  const getFilteredTodos = (): Todo[] => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  // Count active todos
  const activeTodoCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  if (isLoading) {
    return (
      <div className="container mx-auto  px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
              <Link
                to={constants.NEW}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
              >
                <FaPlus size={18} className="mr-1" />
                <span>Add Task</span>
              </Link>
            </div>

            <div className="mb-6">
              <TodoFilter
                filter={filter}
                onFilterChange={setFilter}
                activeTodoCount={activeTodoCount}
                totalCount={todos.length}
              />
            </div>

            <div>
              <TodoList
                todos={getFilteredTodos()}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
