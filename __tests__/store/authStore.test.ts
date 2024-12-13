import { renderHook, act } from '@testing-library/react-native';
import { useAuthStore } from '@/store/authStore';
import { AuthAPI as authApi } from '@/services/api/authApi';




describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isLoading: false, error: null });
    jest.clearAllMocks();
  });

  it('handles login success', async () => {
    jest.spyOn(authApi, 'login').mockResolvedValueOnce({
      user: {
        id: '1',
        username: 'testuser'
      },
      token: 'mock-token'
    });

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login('testuser', 'password123');
    });

    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.username).toBe('testuser');
    expect(result.current.error).toBeNull();
  });

  it('handles login failure', async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login('testuser', '12345');
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Invalid credentials');
  });

  it('handles network error during login', async () => {
    jest.spyOn(authApi, 'login').mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login('testuser', 'password123');
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Network error');
  });

  it('handles signup success', async () => {
    jest.spyOn(authApi, 'register').mockResolvedValueOnce({
      user: {
        id: '1',
        username: 'newuser'
      },
      token: 'new-token'
    });

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.signup('newuser', 'password123');
    });

    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.username).toBe('newuser');
    expect(result.current.error).toBeNull();
  });

  it('handles signup failure', async () => {
    jest.spyOn(authApi, 'register').mockRejectedValueOnce(new Error('Username taken'));

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.signup('existinguser', 'password123');
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Username taken');
  });

  it('handles logout', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
