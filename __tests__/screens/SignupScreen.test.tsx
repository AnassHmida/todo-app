import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SignupScreen} from '@/screens/SignupScreen';
import {useAuthStore} from '@/store/authStore';
import {AuthStore} from '@/store/authStore';

const mockUseAuthStore = useAuthStore as unknown as jest.MockedFunction<() => Partial<AuthStore>>;

jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('SignupScreen', () => {
  const mockSignup = jest.fn();

  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      signup: mockSignup,
      isLoading: false,
      error: null,
    });
  });

  it('renders signup form', () => {
    const {getByPlaceholderText, getByText} = render(<SignupScreen />);
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Already have an account? Login')).toBeTruthy();
  });

  it('handles signup submission', () => {
    const {getByPlaceholderText, getByText} = render(<SignupScreen />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'newuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Sign Up'));

    expect(mockSignup).toHaveBeenCalledWith('newuser', 'password123');
  });

  it('shows loading state', () => {
    mockUseAuthStore.mockReturnValue({
      isLoading: true,
      error: null,
    });
    const {getByTestId} = render(<SignupScreen />);
    expect(getByTestId('loading-overlay')).toBeTruthy();
  });

  it('shows error message', () => {
    const errorMessage = 'Username already taken';
    mockUseAuthStore.mockReturnValue({
      isLoading: false,
      error: errorMessage,
    });
    const {getByText} = render(<SignupScreen />);
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('navigates to login screen', () => {
    const {getByText} = render(<SignupScreen />);
    fireEvent.press(getByText('Already have an account? Login'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
