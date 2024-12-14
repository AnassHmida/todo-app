import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoAPI } from '@/services/api/todoApi';
import { Todo, TodoInput } from '@/types/todo';

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

export const useTodoStore = create(
  persist<TodoStore>(
    (set, get) => ({
      todos: [],
      isLoading: false,
      error: null,

      fetchTodos: async () => {
        set({ isLoading: true, error: null });
        try {
          const todos = await TodoAPI.getTodos();
          set({ todos, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch todos', isLoading: false });
        }
      },

      addTodo: async (todoInput: TodoInput) => {
        set({ isLoading: true, error: null });
        try {
          const newTodo = await TodoAPI.addTodo(todoInput);
          set(state => ({
            todos: [newTodo, ...state.todos],
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to add todo', isLoading: false });
        }
      },

      toggleTodo: async (id: string) => {
        try {
          const todo = get().todos.find(t => t.id === id);
          if (!todo) {
            console.error('Todo not found:', id);
            return;
          }

          const updatedTodo = await TodoAPI.updateTodo(todo.id, {
            completed: !todo.completed,
          });

          set(state => ({
            todos: state.todos.map(t => (t.id === id ? updatedTodo : t)),
          }));
        } catch (error) {
          set({ error: 'Failed to toggle todo' });
        }
      },

      removeTodo: async (id: string) => {
        try {
          await TodoAPI.deleteTodo(id);
          set(state => ({
            todos: state.todos.filter(t => t.id !== id),
          }));
        } catch (error) {
          set({ error: 'Failed to delete todo' });
        }
      },

      updateTodo: async (id: string, title: string) => {
        try {
          const updatedTodo = await TodoAPI.updateTodo(id, { title });
          set(state => ({
            todos: state.todos.map(t => (t.id === id ? updatedTodo : t)),
          }));
        } catch (error) {
          set({ error: 'Failed to update todo' });
        }
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            todos: persistedState.todos || [],
          };
        }
        return persistedState as TodoStore;
      },
    },
  ),
);
