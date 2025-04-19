export type Priority = "high" | "medium" | "low";
export type Category = "work" | "personal" | "shopping" | "health" | "other";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  deletedAt?: string | null;
  category: Category;
  priority: Priority;
} 