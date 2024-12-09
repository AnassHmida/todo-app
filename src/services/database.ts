import {User} from '@/types/auth';
import {Todo, TodoInput} from '@/types/todo';
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase;

const initDB = async () => {
  try {
    db = await SQLite.openDatabase({
      name: 'TodoApp.db',
      location: 'default',
    });
    console.log('Database connected');
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

export const initDatabase = async () => {
  try {
    if (!db) {
      db = await initDB();
    }

    await db.executeSql(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                createdAt TEXT NOT NULL
            );
        `);

    await db.executeSql(`
            CREATE TABLE IF NOT EXISTS todos (
                id TEXT PRIMARY KEY,
                userId TEXT NOT NULL,
                title TEXT NOT NULL,
                completed INTEGER NOT NULL,
                createdAt TEXT NOT NULL,
                updatedAt TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            );
        `);

    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export const TodoDB = {
  async getTodos(userId: string): Promise<Todo[]> {
    try {
      const [results] = await db.executeSql(
        'SELECT * FROM todos WHERE userId = ? ORDER BY createdAt DESC',
        [userId],
      );
      const rows = results.rows.raw();
      return rows.map(row => ({
        id: row.id,
        userId: row.userId,
        title: row.title,
        completed: Boolean(row.completed),
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      }));
    } catch (error) {
      console.error('Error getting todos:', error);
      throw error;
    }
  },

  async addTodo(todo: TodoInput, userId: string): Promise<Todo> {
    const newTodo: Todo = {
      ...todo,
      id: Math.random().toString(36).substring(7),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.executeSql(
      'INSERT INTO todos (id, userId, title, completed, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [
        newTodo.id,
        newTodo.userId,
        newTodo.title,
        newTodo.completed ? 1 : 0,
        newTodo.createdAt.toISOString(),
        newTodo.updatedAt.toISOString(),
      ],
    );

    return newTodo;
  },

  updateTodo: (id: string, updates: Partial<Todo>) => {
    const sets = Object.entries(updates)
      .map(([key, value]) => {
        if (key === 'completed') return `${key} = ${value ? 1 : 0}`;
        if (key === 'createdAt' && value instanceof Date) {
          return `${key} = '${value.toISOString()}'`;
        }
        return `${key} = '${value}'`;
      })
      .join(', ');

    return new Promise<void>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `UPDATE todos SET ${sets} WHERE id = ?`,
          [id],
          () => resolve(),
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  },

  deleteTodo: (id: string) => {
    return new Promise<void>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM todos WHERE id = ?',
          [id],
          () => resolve(),
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  },
};

export const UserDB = {
  async createUser(user: User): Promise<void> {
    try {
      await db.executeSql('INSERT INTO users (id, username, createdAt) VALUES (?, ?, ?)', [
        user.id,
        user.username,
        new Date().toISOString(),
      ]);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUser(id: string): Promise<User | null> {
    try {
      const [results] = await db.executeSql('SELECT * FROM users WHERE id = ?', [id]);
      if (results.rows.length === 0) return null;

      const row = results.rows.item(0);
      return {
        id: row.id,
        username: row.username,
      };
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const [results] = await db.executeSql('SELECT * FROM users WHERE username = ?', [username]);
      if (results.rows.length === 0) return null;

      const row = results.rows.item(0);
      return {
        id: row.id,
        username: row.username,
      };
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },
};

export const clearDatabase = async () => {
  try {
    if (!db) {
      db = await initDB();
    }
    await db.executeSql('DROP TABLE IF EXISTS todos;');
    await initDatabase();
    console.log('Database cleared and reinitialized');
  } catch (error) {
    console.error('Failed to clear database:', error);
    throw error;
  }
};
