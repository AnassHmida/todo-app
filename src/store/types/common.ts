export type Status = 'idle' | 'loading' | 'error' | 'success';

export interface BaseState {
  status: Status;
  error: string | null;
}

export interface Action<T extends string, P = void> {
  type: T;
  payload: P;
}

export type ActionCreator<T extends string, P = void> = (payload: P) => Action<T, P>;
