import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../utils/todoStorage";
import TodoForm from "../../components/todo/TodoForm";

export default function NewPage(): React.ReactElement {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string): Promise<void> => {
    try {
      await addTodo(text);
      navigate("/");
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    }
  };

  return <TodoForm onSubmit={handleSubmit} error={error} />;
}
