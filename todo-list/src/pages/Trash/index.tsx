import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRedo } from "react-icons/fa";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchDeletedTodos,
  permanentlyDeleteTodo,
  restoreTodo,
} from "../../store/slices/todoSlice";

export default function TrashPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { deletedTodos, isLoading, error } = useAppSelector(
    (state) => state.todos
  );
  const [localError, setLocalError] = useState<string | null>(null);

  // Load deleted todos from Redux store on initial render
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        await dispatch(fetchDeletedTodos()).unwrap();
      } catch (err) {
        setLocalError("Failed to load deleted todos");
        console.error("Failed to load deleted todos:", err);
      }
    };
    fetchTodos();
  }, [dispatch]);

  // Handle permanently delete todo
  const handlePermanentlyDelete = async (id: string): Promise<void> => {
    try {
      await dispatch(permanentlyDeleteTodo(id)).unwrap();
      setLocalError(null);
    } catch (err) {
      setLocalError("Failed to permanently delete todo");
      console.error("Failed to permanently delete todo:", err);
    }
  };

  // Handle restore todo
  const handleRestore = async (id: string): Promise<void> => {
    try {
      await dispatch(restoreTodo(id)).unwrap();
      setLocalError(null);
    } catch (err) {
      setLocalError("Failed to restore todo");
      console.error("Failed to restore todo:", err);
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

            {(error || localError) && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error || localError}
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
