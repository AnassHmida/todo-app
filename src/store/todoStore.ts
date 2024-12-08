import {create} from 'zustand';
import {Todo, TodoInput} from '@/types/todo';

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: TodoInput) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
}

export const useTodoStore = create<TodoStore>(set => ({
  todos: [],
  addTodo: (todoInput: TodoInput) =>
    set(state => ({
      todos: [
        ...state.todos,
        {
          ...todoInput,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date(),
        },
      ],
    })),
  toggleTodo: (id: string) =>
    set(state => ({
      todos: state.todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    })),
  removeTodo: (id: string) =>
    set(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    })),
  updateTodo: (id: string, title: string) =>
    set(state => ({
      todos: state.todos.map(todo => (todo.id === id ? {...todo, title} : todo)),
    })),
}));
