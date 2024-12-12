import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyState } from '@/components/common/EmptyState';
import { theme } from '@/theme';

describe('EmptyState', () => {
  it('renders correctly', () => {
    const { getByText } = render(<EmptyState />);
    expect(getByText('No Tasks Yet')).toBeTruthy();
    expect(getByText('Add your first task using the input above!')).toBeTruthy();
  });

  it('applies correct styles', () => {
    const { getByText } = render(<EmptyState />);
    const title = getByText('No Tasks Yet');
    const message = getByText('Add your first task using the input above!');

    expect(title.props.style).toMatchObject({
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
    });

    expect(message.props.style).toMatchObject({
      color: theme.colors.text.secondary,
      textAlign: 'center',
    });
  });
});
