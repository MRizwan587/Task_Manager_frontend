export interface Task {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string | Date;
  createdBy: string | User;
  assignedTo?: string | User;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: "user" | "admin";
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
  dueDate?: string | Date;
  assignedTo?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
  dueDate?: string | Date;
  assignedTo?: string;
}

export interface TaskResponse {
  success: boolean;
  message?: string;
  data: Task | Task[];
}
