import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '@/types/auth';
import {AuthAPI} from '@/services/api/authApi';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface AuthStore extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      token: null,

      hydrate: () => {
        const state = get();
        if (state.token) {
          AuthAPI.setAuthToken(state.token);
        }
      },

      login: async (username: string, password: string) => {
        set({isLoading: true, error: null});
        try {
          const {user, token} = await AuthAPI.login(username, password);
          AuthAPI.setAuthToken(token);
          set({user, token, isLoading: false});
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      signup: async (username: string, password: string) => {
        set({isLoading: true, error: null});
        try {
          const {user, token} = await AuthAPI.register(username, password);
          AuthAPI.setAuthToken(token);
          set({user, token, isLoading: false});
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Signup failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        AuthAPI.clearAuthToken();
        set({user: null, token: null, error: null});
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            token: null,
          };
        }
        return persistedState as AuthStore;
      },
    },
  ),
);
