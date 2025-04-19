"use client";

import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Todo } from "../../../types/todo";
import * as constants from "@/constants/routes";
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps): React.ReactElement {
  return (
    <li className="py-3 flex items-center group">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
        />
        <span
          className={clsx(
            "ml-3 text-gray-800 flex-grow",
            todo.completed && "line-through text-gray-400"
          )}
        >
          {todo.text}
        </span>
      </div>
      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <Link
          to={`${constants.EDIT.replace(":id", todo.id)}`}
          className="text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="Edit todo"
        >
          <FaPen size={16} />
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete todo"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </li>
  );
}
