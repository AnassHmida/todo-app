import React from 'react';
import { render } from '@testing-library/react-native';
import { TodoSectionHeader } from '@/components/todo/TodoSectionHeader';

jest.mock('@/theme', () => ({
  theme: {
    typography: {
      h2: {
        fontSize: 18,
      },
    },
    colors: {
      text: {
        primary: '#000000',
        secondary: '#666666',
      },
    },
    spacing: {
      md: 16,
      lg: 24,
    },
  },
}));

describe('TodoSectionHeader', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TodoSectionHeader title="Active Tasks" />);
    expect(getByText('Active Tasks')).toBeTruthy();
  });

  it('applies correct styles', () => {
    const { getByText } = render(<TodoSectionHeader title="Completed Tasks" />);
    const header = getByText('Completed Tasks');

    expect(header.props.style).toMatchObject({
      fontSize: 18,
      color: '#666666',
      padding: 24,
      paddingBottom: 16,
    });
  });

  it('handles empty title', () => {
    const { getByTestId } = render(<TodoSectionHeader title="" testID="section-header" />);
    expect(getByTestId('section-header')).toBeTruthy();
  });
});
