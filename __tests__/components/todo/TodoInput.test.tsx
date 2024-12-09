import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TodoInput} from '@/components/todo/TodoInput';

describe('TodoInput', () => {
  const mockProps = {
    value: '',
    onChangeText: jest.fn(),
    onSubmit: jest.fn(),
  };

  it('renders input field', () => {
    const {getByPlaceholderText} = render(<TodoInput {...mockProps} />);
    expect(getByPlaceholderText('What needs to be done?')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const {getByPlaceholderText} = render(<TodoInput {...mockProps} />);
    fireEvent.changeText(getByPlaceholderText('What needs to be done?'), 'New todo');
    expect(mockProps.onChangeText).toHaveBeenCalledWith('New todo');
  });

  it('calls onSubmit when pressing add button', () => {
    const {getByText} = render(<TodoInput {...mockProps} value="New todo" />);
    fireEvent.press(getByText('Add'));
    expect(mockProps.onSubmit).toHaveBeenCalled();
  });
});
