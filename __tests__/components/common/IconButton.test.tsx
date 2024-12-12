import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { IconButton } from '@/components/common/IconButton';

describe('IconButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders different icons correctly', () => {
    const icons = ['edit', 'delete', 'logout', 'save'] as const;
    icons.forEach(icon => {
      const { getByTestId } = render(
        <IconButton icon={icon} onPress={mockOnPress} testID={`icon-${icon}`} />,
      );
      expect(getByTestId(`icon-${icon}`)).toBeTruthy();
    });
  });

  it('handles press events', () => {
    const { getByTestId } = render(
      <IconButton icon="edit" onPress={mockOnPress} testID="edit-button" />,
    );
    fireEvent.press(getByTestId('edit-button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom size', () => {
    const customSize = 40;
    const { getByTestId } = render(
      <IconButton icon="edit" onPress={mockOnPress} size={customSize} testID="sized-button" />,
    );
    const button = getByTestId('sized-button');
    expect(button.props.style).toMatchObject({
      width: customSize,
      height: customSize,
    });
  });
});
