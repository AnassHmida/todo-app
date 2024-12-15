import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthActions, AuthState, AuthStore} from './types';
import {authActions} from './actions';
import {AuthAPI} from '@/services/api/authApi';

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const reducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'SET_STATUS':
      return {...state, status: action.payload};
    case 'SET_ERROR':
      return {...state, error: action.payload};
    case 'SET_USER':
      return {...state, user: action.payload.user, token: action.payload.token};
    case 'LOGOUT':
      return {...initialState};
    default:
      return state;
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      hydrate: () => {
        const state = get();
        if (state.token) {
          AuthAPI.setAuthToken(state.token);
        }
      },

      login: async (username: string, password: string) => {
        set(state => reducer(state, authActions.setStatus('loading')));
        try {
          const {user, token} = await AuthAPI.login(username, password);
          AuthAPI.setAuthToken(token);
          set(state => reducer(state, authActions.setUser({user, token})));
          set(state => reducer(state, authActions.setStatus('success')));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          set(state => reducer(state, authActions.setError(message)));
          set(state => reducer(state, authActions.setStatus('error')));
        }
      },

      signup: async (username: string, password: string) => {
        set(state => reducer(state, authActions.setStatus('loading')));
        try {
          const {user, token} = await AuthAPI.register(username, password);
          AuthAPI.setAuthToken(token);
          set(state => reducer(state, authActions.setUser({user, token})));
          set(state => reducer(state, authActions.setStatus('success')));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Signup failed';
          set(state => reducer(state, authActions.setError(message)));
          set(state => reducer(state, authActions.setStatus('error')));
        }
      },

      logout: () => {
        AuthAPI.clearAuthToken();
        set(state => reducer(state, authActions.logout()));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persistedState: any) => {
        if (persistedState.isLoading !== undefined) {
          return {
            ...persistedState,
            status: persistedState.isLoading ? 'loading' : 'idle',
            isLoading: undefined,
          };
        }
        return persistedState as AuthState;
      },
    },
  ),
);
