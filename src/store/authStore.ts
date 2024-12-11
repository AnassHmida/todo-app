import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '@/types/auth';
import {UserDB} from '@/services/database';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthStore extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({isLoading: true, error: null});
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));

          if (password.length < 6) {
            throw new Error('Invalid credentials');
          }

          let user = await UserDB.getUserByUsername(username);

          if (!user) {
            user = {
              id: Date.now().toString(),
              username,
            };
            await UserDB.createUser(user);
          }

          set({user, isLoading: false});
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({error: errorMessage, isLoading: false});
        }
      },

      logout: () => {
        set({user: null, error: null});
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
