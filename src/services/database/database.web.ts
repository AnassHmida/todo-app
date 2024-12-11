import { User } from '@/types/auth';
import { Todo, TodoInput } from '@/types/todo';


declare global {
    interface Window {
        indexedDB: IDBFactory;
    }
}

const DB_NAME = 'TodoApp';
const DB_VERSION = 1;

let db: IDBDatabase;

const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request: IDBOpenDBRequest = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const database = (event.target as IDBOpenDBRequest).result;

            if (!database.objectStoreNames.contains('users')) {
                database.createObjectStore('users', { keyPath: 'id' });
            }

            if (!database.objectStoreNames.contains('todos')) {
                const todoStore = database.createObjectStore('todos', { keyPath: 'id' });
                todoStore.createIndex('userId', 'userId', { unique: false });
            }
        };
    });
};

export const TodoDB = {
    async getTodos(userId: string): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['todos'], 'readonly');
            const store = transaction.objectStore('todos');
            const index = store.index('userId');
            const request = index.getAll(userId);

            request.onsuccess = () => {
                const todos = request.result.map(todo => ({
                    ...todo,
                    createdAt: new Date(todo.createdAt),
                    updatedAt: new Date(todo.updatedAt),
                }));
                resolve(todos);
            };
            request.onerror = () => reject(request.error);
        });
    },

    async addTodo(todo: TodoInput, userId: string): Promise<Todo> {
        const newTodo: Todo = {
            ...todo,
            id: Math.random().toString(36).substring(7),
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['todos'], 'readwrite');
            const store = transaction.objectStore('todos');
            const request = store.add(newTodo);

            request.onsuccess = () => resolve(newTodo);
            request.onerror = () => reject(request.error);
        });
    },

    async updateTodo(id: string, updates: Partial<Todo>): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['todos'], 'readwrite');
            const store = transaction.objectStore('todos');
            const request = store.get(id);

            request.onsuccess = () => {
                const todo = request.result;
                const updatedTodo = { ...todo, ...updates };
                store.put(updatedTodo);
                resolve();
            };
            request.onerror = () => reject(request.error);
        });
    },

    async deleteTodo(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['todos'], 'readwrite');
            const store = transaction.objectStore('todos');
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },
};

export const UserDB = {
    async createUser(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.add(user);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    async getUser(id: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    },

    async getUserByUsername(username: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const request = store.openCursor();

            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    if (cursor.value.username === username) {
                        resolve(cursor.value);
                    } else {
                        cursor.continue();
                    }
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    },
};

export const initDatabase = async () => {
    try {
        if (!window.indexedDB) {
            throw new Error('Your browser does not support IndexedDB');
        }
        db = await initDB();
        console.log('IndexedDB initialized');
    } catch (error) {
        console.error('Failed to initialize IndexedDB:', error);
        throw error;
    }
}; 