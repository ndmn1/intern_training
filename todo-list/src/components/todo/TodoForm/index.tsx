import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, Priority } from "../../../types/todo";

interface TodoFormProps {
  initialText?: string;
  initialCategory?: Category;
  initialPriority?: Priority;
  onSubmit: (data: {
    text: string;
    category: Category;
    priority: Priority;
  }) => Promise<void>;
  error?: string | null;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
];

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: "high", label: "High", color: "text-red-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "low", label: "Low", color: "text-green-600" },
];

export default function TodoForm({
  initialText,
  initialCategory = "work",
  initialPriority = "low",
  onSubmit,
  error,
}: TodoFormProps): React.ReactElement {
  const [text, setText] = useState(initialText ?? "");
  const [category, setCategory] = useState<Category>(initialCategory);
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text?.trim()) return;
    await onSubmit({ text: text.trim(), category, priority });
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {initialText ? "Edit Task" : "Add Task"}
          </h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Task
              </label>
              <input
                type="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                placeholder="Enter your task"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="flex gap-4">
                {PRIORITIES.map((pri) => (
                  <label
                    key={pri.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={pri.value}
                      checked={priority === pri.value}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="sr-only"
                    />
                    <div
                      className={`px-3 py-2 rounded-md ${
                        priority === pri.value
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {pri.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {initialText ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
