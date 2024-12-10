import {create} from 'zustand';
import {TodoDB} from '@/services/database';
import {Todo, TodoInput} from '@/types/todo';
import {handleError} from '@/utils/errorHandler';
import {useAuthStore} from '@/store/authStore';

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;

  fetchTodos: () => Promise<void>;
  addTodo: (todo: TodoInput) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({isLoading: true, error: null});
    try {
      const todos = await TodoDB.getTodos(userId);
      set({todos, isLoading: false});
    } catch (error) {
      handleError(error);
      set({error: 'Failed to fetch todos', isLoading: false});
    }
  },

  addTodo: async (todoInput: TodoInput) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({isLoading: true, error: null});
    try {
      const newTodo = await TodoDB.addTodo(todoInput, userId);
      set(state => ({
        todos: [newTodo, ...state.todos],
        isLoading: false,
      }));
    } catch (error) {
      handleError(error);
      set({error: 'Failed to add todo', isLoading: false});
    }
  },

  toggleTodo: async (id: string) => {
    try {
      const todo = get().todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = {...todo, completed: !todo.completed};
      await TodoDB.updateTodo(id, {completed: updatedTodo.completed});

      set(state => ({
        todos: state.todos.map(t => (t.id === id ? updatedTodo : t)),
      }));
    } catch (error) {
      handleError(error);
      set({error: 'Failed to toggle todo'});
    }
  },

  removeTodo: async (id: string) => {
    try {
      await TodoDB.deleteTodo(id);
      set(state => ({
        todos: state.todos.filter(t => t.id !== id),
      }));
    } catch (error) {
      handleError(error);
      set({error: 'Failed to delete todo'});
    }
  },

  updateTodo: async (id: string, title: string) => {
    try {
      const todo = get().todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = {...todo, title, updatedAt: new Date()};
      await TodoDB.updateTodo(id, {title, updatedAt: updatedTodo.updatedAt});

      set(state => ({
        todos: state.todos.map(t => (t.id === id ? updatedTodo : t)),
      }));
    } catch (error) {
      handleError(error);
      set({error: 'Failed to update todo'});
    }
  },
}));
