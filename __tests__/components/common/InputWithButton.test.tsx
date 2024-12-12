import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { InputWithButton } from '@/components/common/InputWithButton';

jest.mock('@/components/common/Button', () => ({
  Button: ({ onPress, disabled, title, testID }: any) => (
    <button testID={testID || 'button'} onClick={onPress} disabled={disabled}>
      {title}
    </button>
  ),
}));

describe('InputWithButton', () => {
  const defaultProps = {
    value: '',
    onChangeText: jest.fn(),
    onSubmit: jest.fn(),
    placeholder: 'Test placeholder',
    buttonTitle: 'Submit',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<InputWithButton {...defaultProps} />);
    expect(getByPlaceholderText('Test placeholder')).toBeTruthy();
    expect(getByTestId('button')).toBeTruthy();
  });

  it('handles text input', () => {
    const { getByPlaceholderText } = render(<InputWithButton {...defaultProps} />);
    fireEvent.changeText(getByPlaceholderText('Test placeholder'), 'New text');
    expect(defaultProps.onChangeText).toHaveBeenCalledWith('New text');
  });

  it('handles submit', () => {
    const { getByTestId } = render(<InputWithButton {...defaultProps} value="Test value" />);
    fireEvent.press(getByTestId('button'));
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it('disables button when value is empty', () => {
    const { getByTestId } = render(<InputWithButton {...defaultProps} value="" />);
    const button = getByTestId('button');
    expect(button.props.disabled).toBe(true);
  });

  it('handles custom button title', () => {
    const { getByTestId } = render(<InputWithButton {...defaultProps} buttonTitle="Custom" />);
    const button = getByTestId('button');
    expect(button.props.children).toBe('Custom');
  });

  it('handles disabled state', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <InputWithButton {...defaultProps} disabled />,
    );
    const input = getByPlaceholderText('Test placeholder');
    const button = getByTestId('button');

    expect(input.props.editable).toBe(false);
    expect(button.props.disabled).toBe(true);
  });
});
