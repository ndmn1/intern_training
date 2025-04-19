import React, { useEffect, useState } from "react";
import {
  getDeletedTodos,
  permanentlyDeleteTodo,
  restoreTodo,
} from "../../utils/todoStorage";
import { FaTrashAlt, FaRedo } from "react-icons/fa";
import clsx from "clsx";
import { Todo } from "../../types/todo";

export default function TrashPage(): React.ReactElement {
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load deleted todos from localStorage on initial render
  useEffect(() => {
    const loadDeletedTodos = async () => {
      try {
        setIsLoading(true);
        const loadedTodos = await getDeletedTodos();
        setDeletedTodos(loadedTodos);
        setError(null);
      } catch (err) {
        setError("Failed to load deleted todos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeletedTodos();
  }, []);

  // Handle permanently delete todo
  const handlePermanentlyDelete = async (id: string): Promise<void> => {
    try {
      await permanentlyDeleteTodo(id);
      const updatedTodos = await getDeletedTodos();
      setDeletedTodos(updatedTodos);
      setError(null);
    } catch (err) {
      setError("Failed to permanently delete todo");
      console.error(err);
    }
  };

  // Handle restore todo
  const handleRestore = async (id: string): Promise<void> => {
    try {
      await restoreTodo(id);
      const updatedTodos = await getDeletedTodos();
      setDeletedTodos(updatedTodos);
      setError(null);
    } catch (err) {
      setError("Failed to restore todo");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Trash</h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {deletedTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No deleted tasks found.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {deletedTodos.map((todo) => (
                  <li key={todo.id} className="py-3 flex items-center group">
                    <div className="flex items-center flex-grow">
                      <span
                        className={clsx(
                          "text-gray-800",
                          todo.completed && "line-through text-gray-400"
                        )}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRestore(todo.id)}
                        className="text-gray-400 hover:text-green-500 transition-colors"
                        aria-label="Restore todo"
                      >
                        <FaRedo size={18} />
                      </button>
                      <button
                        onClick={() => handlePermanentlyDelete(todo.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Permanently delete todo"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
