import {renderHook, act} from '@testing-library/react-native';
import {useAuthStore} from '@/store/authStore';
import * as database from '@/services/database';

jest.mock('@/services/database', () => ({
  UserDB: {
    getUserByUsername: jest.fn(),
    createUser: jest.fn(),
  },
}));

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({user: null, isLoading: false, error: null});
    jest.clearAllMocks();
  });

  it('handles login success', async () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
    };

    (database.UserDB.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (database.UserDB.createUser as jest.Mock).mockResolvedValue(undefined);

    const {result} = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login('testuser', 'password123');
    });

    expect(database.UserDB.getUserByUsername).toHaveBeenCalledWith('testuser');

    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.username).toBe('testuser');
    expect(result.current.error).toBeNull();
  });

  it('handles login failure', async () => {
    const {result} = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login('testuser', '12345');
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Invalid credentials');
  });
});
