import {Status, BaseState, Action} from '../types/common';
import {Todo, TodoInput} from '@/types/todo';

export interface TodoState extends BaseState {
  todos: Todo[];
}

export type TodoActions =
  | Action<'SET_STATUS', Status>
  | Action<'SET_ERROR', string | null>
  | Action<'SET_TODOS', Todo[]>
  | Action<'ADD_TODO', Todo>
  | Action<'UPDATE_TODO', Todo>
  | Action<'REMOVE_TODO', string>;

export interface TodoStore extends TodoState {
  fetchTodos: () => Promise<void>;
  addTodo: (input: TodoInput) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
}
