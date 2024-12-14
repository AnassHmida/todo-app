import {ApiClient} from './apiClient';
import {Todo, TodoInput} from '@/types/todo';

const api = ApiClient.getInstance().getAxiosInstance();

export const TodoAPI = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data.map((todo: any) => ({
      id: todo._id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));
  },

  addTodo: async (todo: TodoInput): Promise<Todo> => {
    const response = await api.post('/todos', todo);
    const newTodo = response.data;
    return {
      id: newTodo._id,
      title: newTodo.title,
      completed: newTodo.completed,
      createdAt: newTodo.createdAt,
      updatedAt: newTodo.updatedAt,
    };
  },

  updateTodo: async (id: string, updates: Partial<Todo>): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, updates);
    const todo = response.data;
    return {
      id: todo._id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  },

  async deleteTodo(id: string): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
};
