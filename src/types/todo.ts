export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TodoInput = {
  title: string;
  completed: boolean;
};
