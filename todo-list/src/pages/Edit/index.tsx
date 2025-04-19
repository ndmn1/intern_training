import React, { useEffect, useState } from "react";
import { getTodoById, updateTodo } from "../../utils/todoStorage";
import { useNavigate, useParams } from "react-router-dom";
import { Todo, Category, Priority } from "../../types/todo";
import TodoForm from "../../components/todo/TodoForm";

export default function EditPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodo = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const loadedTodo = await getTodoById(id);
        if (loadedTodo) {
          setTodo(loadedTodo);
        } else {
          setError("Todo not found");
        }
      } catch (err) {
        setError("Failed to load todo");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodo();
  }, [id]);

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
      await updateTodo(id, { text, category, priority });
      navigate("/");
    } catch (err) {
      setError("Failed to update todo");
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

  if (!todo) {
    return (
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Todo not found</div>
      </div>
    );
  }

  return (
    <TodoForm
      initialText={todo.text}
      initialCategory={todo.category}
      initialPriority={todo.priority}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}
