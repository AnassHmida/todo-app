import {BaseState, Status} from '../types/common';
import {User} from '@/types/auth';

export interface AuthState extends BaseState {
  user: User | null;
  token: string | null;
}

export type AuthActions =
  | {type: 'SET_STATUS'; payload: Status}
  | {type: 'SET_ERROR'; payload: string | null}
  | {type: 'SET_USER'; payload: {user: User; token: string}}
  | {type: 'LOGOUT'};

export interface AuthStore extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}
