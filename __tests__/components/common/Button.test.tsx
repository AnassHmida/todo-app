import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/common/Button';
import { theme } from '@/theme';
describe('Button', () => {
  const defaultProps = {
    title: 'Test Button',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    fireEvent.press(getByText('Test Button'));
    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it('renders secondary variant correctly', () => {
    const { getByTestId } = render(
      <Button {...defaultProps} variant="secondary" testID="button" />,
    );
    const button = getByTestId('button');
    expect(button.props.style).toMatchObject({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    });
  });

  it('applies disabled styling', () => {
    const { getByTestId } = render(<Button {...defaultProps} disabled testID="button" />);
    const button = getByTestId('button');
    expect(button.props.style).toMatchObject({
      backgroundColor: '#D1D1D6',
    });
  });

  it('does not trigger onPress when disabled', () => {
    const { getByText } = render(<Button {...defaultProps} disabled />);
    fireEvent.press(getByText('Test Button'));
    expect(defaultProps.onPress).not.toHaveBeenCalled();
  });
});
