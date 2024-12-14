import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SignupScreen} from '@/screens/SignupScreen';
import {useAuthStore} from '@/store/authStore';

jest.mock('@/store/authStore');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('SignupScreen', () => {
  beforeEach(() => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      signup: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  it('renders signup form', () => {
    const {getByPlaceholderText, getByText} = render(<SignupScreen />);
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByText(/Already have an account/)).toBeTruthy();
  });

  it('handles signup submission', () => {
    const mockSignup = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      signup: mockSignup,
      isLoading: false,
      error: null,
    });

    const {getByPlaceholderText, getByText} = render(<SignupScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'newuser');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.press(getByText('Create Account'));

    expect(mockSignup).toHaveBeenCalledWith('newuser', 'password123');
  });
});
