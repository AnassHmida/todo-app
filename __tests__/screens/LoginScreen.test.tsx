import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {LoginScreen} from '@/screens/LoginScreen';
import {useAuthStore} from '@/store/auth/authStore';
import {AuthStore} from '@/store/auth/types';

// First cast to unknown, then to jest.Mock
const mockUseAuthStore = useAuthStore as unknown as jest.MockedFunction<() => Partial<AuthStore>>;

jest.mock('@/store/auth/authStore', () => ({
  useAuthStore: jest.fn(),
}));

describe('LoginScreen', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
      status: 'idle',
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
    mockUseAuthStore.mockReturnValue({
      status: 'loading',
      error: null,
    });
    const {getByTestId} = render(<LoginScreen />);
    expect(getByTestId('loading-overlay')).toBeTruthy();
  });

  it('shows error message', () => {
    const errorMessage = 'Invalid credentials';
    mockUseAuthStore.mockReturnValue({
      status: 'idle',
      error: errorMessage,
    });
    const {getByText} = render(<LoginScreen />);
    expect(getByText(errorMessage)).toBeTruthy();
  });
});
