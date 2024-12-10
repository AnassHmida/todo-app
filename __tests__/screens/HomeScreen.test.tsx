import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {HomeScreen} from '@/screens/HomeScreen';
import {useTodoStore} from '@/store/todoStore';

jest.mock('@/store/todoStore');

describe('HomeScreen', () => {
  const mockTodos = [
    {
      id: '1',
      title: 'Test Todo 1',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user1',
    },
    {
      id: '2',
      title: 'Test Todo 2',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user1',
    },
  ];

  const mockFetchTodos = jest.fn();

  beforeEach(() => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: mockTodos,
      isLoading: false,
      error: null,
      fetchTodos: mockFetchTodos,
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      removeTodo: jest.fn(),
      updateTodo: jest.fn(),
    });
  });

  it('renders todo list correctly', async () => {
    const {getByText} = render(<HomeScreen />);
    await waitFor(() => {
      expect(getByText('Test Todo 1')).toBeTruthy();
      expect(getByText('Test Todo 2')).toBeTruthy();
    });
  });

  it('shows loading state', async () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: [],
      isLoading: true,
      error: null,
      fetchTodos: mockFetchTodos,
    });

    const {getByTestId} = render(<HomeScreen />);
    await waitFor(() => {
      expect(getByTestId('loading-overlay')).toBeTruthy();
    });
  });

  it('shows error state', async () => {
    const errorMessage = 'Failed to load todos';
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: [],
      isLoading: false,
      error: errorMessage,
      fetchTodos: mockFetchTodos,
    });

    const {getByText} = render(<HomeScreen />);
    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy();
    });
  });
});
