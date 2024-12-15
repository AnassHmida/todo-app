import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {HomeScreen} from '@/screens/HomeScreen';
import {useTodoStore} from '@/store/todo/todoStore';

jest.mock('@/store/todo/todoStore');

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
      status: 'idle',
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

  it('shows empty state when no todos', async () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: [],
      status: 'idle',
      error: null,
      fetchTodos: mockFetchTodos,
    });

    const {getByText} = render(<HomeScreen />);
    expect(getByText('No Tasks Yet')).toBeTruthy();
    expect(getByText('Add your first task using the input above!')).toBeTruthy();
  });

  it('shows loading state', async () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: [],
      status: 'loading',
      error: null,
      fetchTodos: mockFetchTodos,
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      removeTodo: jest.fn(),
      updateTodo: jest.fn(),
    });

    const {getByTestId} = render(<HomeScreen />);
    expect(getByTestId('loading-overlay')).toBeTruthy();
  });
});
