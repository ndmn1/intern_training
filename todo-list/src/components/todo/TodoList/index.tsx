"use client";

import React from "react";
import { Todo } from "../../../types/todo";
import TodoItem from "../TodoItem";
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps): React.ReactElement {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No tasks found.</div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
