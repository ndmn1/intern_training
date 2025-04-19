"use client";

import React from "react";
import { FaTrash, FaPen, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Todo, Priority } from "@/types/todo";
import * as constants from "@/constants/routes";
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUndo?: (id: string) => void;
  showUndo?: boolean;
  onReset: (todo: Todo) => void;
}

const PRIORITY_COLORS: Record<Priority, string> = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
};

const CATEGORY_COLORS: Record<string, string> = {
  work: "bg-blue-100 text-blue-800",
  personal: "bg-purple-100 text-purple-800",
  shopping: "bg-green-100 text-green-800",
  health: "bg-pink-100 text-pink-800",
  other: "bg-gray-100 text-gray-800",
};
export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onReset,
}: TodoItemProps): React.ReactElement {
  return (
<li className="p-4 hover:bg-gray-50 rounded-lg transition-colors mb-2">
  <div className="flex items-start gap-3">
    {/* Checkbox column */}
    <div className="pt-1">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
      />
    </div>
    
    <div className="flex-grow">
      {/* Todo text */}
      <div className="mb-1.5">
        <span
          className={clsx(
            "font-medium text-gray-800 break-words",
            todo.completed && "line-through text-gray-400"
          )}
        >
          {todo.text}
        </span>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={clsx(
            "text-xs px-2 py-0.5 rounded-full w-15 text-center",
            CATEGORY_COLORS[todo.category]
          )}
        >
          {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
        </span>
        
        <span
          className={clsx(
            "text-xs px-2 py-0.5 rounded-full w-15",
            PRIORITY_COLORS[todo.priority]
          )}
        >
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
        </span>
        
        <span className="text-xs text-gray-500">
          {new Date(todo.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
    
    <div className="flex items-center space-x-1 sm:space-x-2">
      <button
        onClick={() => onReset(todo)}
        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Undo changes"
      >
        <FaUndo size={16} />
      </button>
      
      <Link
        to={`${constants.EDIT.replace(":id", todo.id)}`}
        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Edit todo"
      >
        <FaPen size={16} />
      </Link>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        aria-label="Delete todo"
      >
        <FaTrash size={16} />
      </button>
    </div>
  </div>
</li>
  );
}
