import {ActionCreator, Status} from '../types/common';
import {User} from '@/types/auth';

export const authActions = {
  setStatus: (status => ({
    type: 'SET_STATUS',
    payload: status,
  })) as ActionCreator<'SET_STATUS', Status>,

  setError: (error => ({
    type: 'SET_ERROR',
    payload: error,
  })) as ActionCreator<'SET_ERROR', string | null>,

  setUser: (data => ({
    type: 'SET_USER',
    payload: data,
  })) as ActionCreator<'SET_USER', {user: User; token: string}>,

  logout: (() => ({
    type: 'LOGOUT' as const,
  })) as ActionCreator<'LOGOUT'>,
};
