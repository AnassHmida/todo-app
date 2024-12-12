import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@/components/common/Input';

describe('Input', () => {
  const defaultProps = {
    value: '',
    onChangeText: jest.fn(),
    placeholder: 'Test placeholder',
  };

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    expect(getByPlaceholderText('Test placeholder')).toBeTruthy();
  });

  it('handles text changes', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    fireEvent.changeText(getByPlaceholderText('Test placeholder'), 'New text');
    expect(defaultProps.onChangeText).toHaveBeenCalledWith('New text');
  });

  it('handles disabled state', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} disabled />);
    const input = getByPlaceholderText('Test placeholder');
    expect(input.props.editable).toBe(false);
  });

  it('handles multiline prop', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} multiline numberOfLines={3} />);
    const input = getByPlaceholderText('Test placeholder');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(3);
  });
});
