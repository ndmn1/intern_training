import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../utils/todoStorage";
import TodoForm from "../../components/todo/TodoForm";
import { Category, Priority } from "../../types/todo";

export default function NewPage(): React.ReactElement {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({
    text,
    category,
    priority,
  }: {
    text: string;
    category: Category;
    priority: Priority;
  }): Promise<void> => {
    try {
      await addTodo(text, category, priority);
      navigate("/");
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    }
  };

  return <TodoForm onSubmit={handleSubmit} error={error} />;
}
