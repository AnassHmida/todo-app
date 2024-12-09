import {initDatabase, TodoDB, UserDB, clearDatabase} from '@/services/database';
import SQLite from 'react-native-sqlite-storage';

jest.mock('react-native-sqlite-storage', () => ({
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() => ({
    executeSql: jest.fn().mockImplementation((query, params) => {
      if (query.includes('WHERE username = ?')) {
        const [username] = params;
        if (username === 'testuser') {
          return Promise.resolve([
            {
              rows: {
                length: 1,
                item: () => ({
                  id: '1',
                  username: 'testuser',
                }),
                raw: () => [
                  {
                    id: '1',
                    username: 'testuser',
                  },
                ],
              },
            },
          ]);
        } else {
          return Promise.resolve([
            {
              rows: {
                length: 0,
                item: () => null,
                raw: () => [],
              },
            },
          ]);
        }
      }

      return Promise.resolve([
        {
          rows: {
            length: 1,
            item: () => ({
              id: '1',
              userId: '1',
              title: 'Test Todo',
              completed: 0,
            }),
            raw: () => [
              {
                id: '1',
                userId: '1',
                title: 'Test Todo',
                completed: 0,
              },
            ],
          },
        },
      ]);
    }),
    transaction: jest.fn(callback =>
      callback({
        executeSql: jest.fn(),
      }),
    ),
  })),
}));

describe('Database Service', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it('initializes database successfully', async () => {
    await initDatabase();
    expect(SQLite.openDatabase).toHaveBeenCalled();
  });

  it('handles todo operations correctly', async () => {
    await initDatabase();
    const todos = await TodoDB.getTodos('1');
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Test Todo');
  });
});

describe('TodoDB CRUD Operations', () => {
  const testTodo = {
    title: 'Test Todo',
    completed: false,
  };

  beforeEach(async () => {
    await clearDatabase();
    await initDatabase();
  });

  it('performs full CRUD cycle', async () => {
    const mockDb = SQLite.openDatabase({name: 'TestDB.db', location: 'default'});

    (mockDb.executeSql as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve([
        {
          rows: {length: 1, item: () => testTodo},
        },
      ]),
    );

    (mockDb.executeSql as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve([
        {
          rows: {
            length: 1,
            raw: () => [{...testTodo, id: '1', userId: '1'}],
          },
        },
      ]),
    );

    const newTodo = await TodoDB.addTodo(testTodo, '1');
    expect(newTodo.title).toBe('Test Todo');

    const todos = await TodoDB.getTodos('1');
    expect(todos).toHaveLength(1);
  }, 10000);
});

describe('UserDB Operations', () => {
  beforeEach(async () => {
    await clearDatabase();
    await initDatabase();
    (SQLite.openDatabase({name: 'TestDB.db', location: 'default'}) as any).executeSql.mockReset();
  });

  it('creates and retrieves user successfully', async () => {
    const testUser = {
      id: '1',
      username: 'testuser',
    };

    await UserDB.createUser(testUser);
    const retrievedUser = await UserDB.getUserByUsername('testuser');

    expect(retrievedUser).toBeTruthy();
    expect(retrievedUser?.username).toBe('testuser');
  });

  it('returns null for non-existent user', async () => {
    const user = await UserDB.getUserByUsername('nonexistent');
    expect(user).toBeNull();
  });
});
