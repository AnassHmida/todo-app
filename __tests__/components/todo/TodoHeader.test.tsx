import React from 'react';
import { render } from '@testing-library/react-native';
import { TodoHeader } from '@/components/todo/TodoHeader';

describe('TodoHeader', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TodoHeader />);
    expect(getByText('My Tasks')).toBeTruthy();
  });
});
