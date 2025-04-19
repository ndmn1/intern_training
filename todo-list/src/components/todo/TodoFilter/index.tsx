import React from "react";
import clsx from "clsx";

type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeTodoCount: number;
  totalCount: number;
}

export default function TodoFilter({
  filter,
  onFilterChange,
  activeTodoCount,
  totalCount,
}: TodoFilterProps): React.ReactElement {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="text-sm text-gray-600">
        {activeTodoCount} active / {totalCount} total tasks
      </div>
      <div className="flex space-x-2">
        <button
          className={clsx(
            "px-3 py-1 rounded-md text-sm",
            filter === "all"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-100"
          )}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>
        <button
          className={clsx(
            "px-3 py-1 rounded-md text-sm",
            filter === "active"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-100"
          )}
          onClick={() => onFilterChange("active")}
        >
          Active
        </button>
        <button
          className={clsx(
            "px-3 py-1 rounded-md text-sm",
            filter === "completed"
              ? "bg-purple-600 text-white"
              : "text-gray-600 hover:bg-purple-100"
          )}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
