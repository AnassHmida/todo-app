export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoInput = {
  title: string;
  completed: boolean;
};
