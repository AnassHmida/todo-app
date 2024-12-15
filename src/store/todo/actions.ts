import {Status, ActionCreator} from '../types/common';
import {Todo} from '@/types/todo';

export const todoActions = {
  setStatus: (status => ({
    type: 'SET_STATUS',
    payload: status,
  })) as ActionCreator<'SET_STATUS', Status>,

  setError: (error => ({
    type: 'SET_ERROR',
    payload: error,
  })) as ActionCreator<'SET_ERROR', string | null>,

  setTodos: (todos => ({
    type: 'SET_TODOS',
    payload: todos,
  })) as ActionCreator<'SET_TODOS', Todo[]>,

  addTodo: (todo => ({
    type: 'ADD_TODO',
    payload: todo,
  })) as ActionCreator<'ADD_TODO', Todo>,

  updateTodo: (todo => ({
    type: 'UPDATE_TODO',
    payload: todo,
  })) as ActionCreator<'UPDATE_TODO', Todo>,

  removeTodo: (id => ({
    type: 'REMOVE_TODO',
    payload: id,
  })) as ActionCreator<'REMOVE_TODO', string>,
};
