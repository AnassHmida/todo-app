export interface User {
  id: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
