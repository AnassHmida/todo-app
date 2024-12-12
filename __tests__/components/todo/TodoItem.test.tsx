import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoItem } from '@/components/todo/TodoItem';

const mockTodo = {
  id: '1',
  userId: 'user1',
  title: 'Test Todo',
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('TodoItem', () => {
  const mockProps = {
    todo: mockTodo,
    onToggle: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<TodoItem {...mockProps} />);
    expect(getByTestId('checkbox')).toBeTruthy();
    expect(getByText('Test Todo')).toBeTruthy();
    expect(getByTestId('delete-button')).toBeTruthy();
  });

  it('handles toggle correctly', () => {
    const { getByTestId } = render(<TodoItem {...mockProps} />);
    fireEvent.press(getByTestId('checkbox'));
    expect(mockProps.onToggle).toHaveBeenCalledWith('1');
  });

  it('handles edit mode correctly', () => {
    const { getByTestId, getByText } = render(<TodoItem {...mockProps} />);
    fireEvent.press(getByText('Test Todo'));
    expect(getByTestId('todo-input')).toBeTruthy();
    expect(getByTestId('save-button')).toBeTruthy();
  });
});
