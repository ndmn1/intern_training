import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category, Priority } from "../../types/todo";
import TodoForm from "../../components/todo/TodoForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTodoById, updateTodo } from "../../store/slices/todoSlice";

export default function EditPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const { isLoading, currentTodo } = useAppSelector((state) => state.todos);

  useEffect(() => {
    if (id) {
      dispatch(getTodoById(id))
        .unwrap()
        .catch((err) => {
          setError("Failed to load todo");
          console.error("Failed to load todo:", err);
        });
    }
  }, [dispatch, id]);

  const handleSubmit = async ({
    text,
    category,
    priority,
  }: {
    text: string;
    category: Category;
    priority: Priority;
  }): Promise<void> => {
    if (!id) return;

    try {
      await dispatch(
        updateTodo({
          id,
          updates: { text, category, priority },
        })
      ).unwrap();
      navigate("/");
    } catch (err) {
      setError("Failed to update todo");
      console.error("Failed to update todo:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!currentTodo) {
    return (
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Todo not found</div>
      </div>
    );
  }

  return (
    <TodoForm
      initialText={currentTodo.text}
      initialCategory={currentTodo.category}
      initialPriority={currentTodo.priority}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}
