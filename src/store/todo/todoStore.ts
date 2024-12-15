import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoState, TodoActions, TodoStore} from './types';
import {todoActions} from './actions';
import {TodoAPI} from '@/services/api/todoApi';

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

const reducer = (state: TodoState, action: TodoActions): TodoState => {
  switch (action.type) {
    case 'SET_STATUS':
      return {...state, status: action.payload};
    case 'SET_ERROR':
      return {...state, error: action.payload};
    case 'SET_TODOS':
      return {...state, todos: action.payload};
    case 'ADD_TODO':
      return {...state, todos: [action.payload, ...state.todos]};
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload : todo)),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchTodos: async () => {
        set(state => reducer(state, todoActions.setStatus('loading')));
        try {
          const todos = await TodoAPI.getTodos();
          set(state => reducer(state, todoActions.setTodos(todos)));
          set(state => reducer(state, todoActions.setStatus('success')));
        } catch (error) {
          set(state => reducer(state, todoActions.setError('Failed to fetch todos')));
          set(state => reducer(state, todoActions.setStatus('error')));
        }
      },

      addTodo: async todoInput => {
        set(state => reducer(state, todoActions.setStatus('loading')));
        try {
          const newTodo = await TodoAPI.addTodo(todoInput);
          set(state => reducer(state, todoActions.addTodo(newTodo)));
          set(state => reducer(state, todoActions.setStatus('success')));
        } catch (error) {
          set(state => reducer(state, todoActions.setError('Failed to add todo')));
          set(state => reducer(state, todoActions.setStatus('error')));
        }
      },

      toggleTodo: async (id: string) => {
        set(state => reducer(state, todoActions.setStatus('loading')));
        try {
          const todo = get().todos.find(t => t.id === id);
          if (!todo) throw new Error('Todo not found');
          const updated = await TodoAPI.updateTodo(id, {completed: !todo.completed});
          set(state => reducer(state, todoActions.updateTodo(updated)));
          set(state => reducer(state, todoActions.setStatus('success')));
        } catch (error) {
          set(state => reducer(state, todoActions.setError('Failed to toggle todo')));
          set(state => reducer(state, todoActions.setStatus('error')));
        }
      },

      removeTodo: async (id: string) => {
        set(state => reducer(state, todoActions.setStatus('loading')));
        try {
          await TodoAPI.deleteTodo(id);
          set(state => reducer(state, todoActions.removeTodo(id)));
          set(state => reducer(state, todoActions.setStatus('success')));
        } catch (error) {
          set(state => reducer(state, todoActions.setError('Failed to remove todo')));
          set(state => reducer(state, todoActions.setStatus('error')));
        }
      },

      updateTodo: async (id: string, title: string) => {
        set(state => reducer(state, todoActions.setStatus('loading')));
        try {
          const updated = await TodoAPI.updateTodo(id, {title});
          set(state => reducer(state, todoActions.updateTodo(updated)));
          set(state => reducer(state, todoActions.setStatus('success')));
        } catch (error) {
          set(state => reducer(state, todoActions.setError('Failed to update todo')));
          set(state => reducer(state, todoActions.setStatus('error')));
        }
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persistedState: any) => {
        if (persistedState.isLoading !== undefined) {
          return {
            ...persistedState,
            status: persistedState.isLoading ? 'loading' : 'idle',
            isLoading: undefined,
          };
        }
        return persistedState as TodoState;
      },
    },
  ),
);
