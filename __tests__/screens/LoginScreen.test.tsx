import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {LoginScreen} from '@/screens/LoginScreen';
import {useAuthStore} from '@/store/authStore';

jest.mock('@/store/authStore');

describe('LoginScreen', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useAuthStore as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
  });

  it('renders login form', () => {
    const {getByPlaceholderText, getByText} = render(<LoginScreen />);
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('handles login submission', () => {
    const {getByPlaceholderText, getByText} = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
  });

  it('shows loading state', () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
    });
    const {getByTestId} = render(<LoginScreen />);
    expect(getByTestId('loading-overlay')).toBeTruthy();
  });

  it('shows error message', () => {
    const errorMessage = 'Invalid credentials';
    (useAuthStore as jest.Mock).mockReturnValue({
      isLoading: false,
      error: errorMessage,
    });
    const {getByText} = render(<LoginScreen />);
    expect(getByText(errorMessage)).toBeTruthy();
  });
});
