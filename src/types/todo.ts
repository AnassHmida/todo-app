export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoInput = Omit<Todo, 'id' | 'createdAt'>;
