import { renderHook, act } from '@testing-library/react-native';
import { useTodoStore } from '@/store/todoStore';
import { TodoAPI } from '@/services/api/todoApi';

const mockTodo = {
    id: '1',
    title: 'Test Todo',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

describe('todoStore', () => {
    beforeEach(() => {
        useTodoStore.setState({ todos: [], isLoading: false, error: null });
        jest.clearAllMocks();
    });

    it('handles fetchTodos success', async () => {
        jest.spyOn(TodoAPI, 'getTodos').mockResolvedValueOnce([mockTodo]);

        const { result } = renderHook(() => useTodoStore());

        await act(async () => {
            await result.current.fetchTodos();
        });

        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0]).toEqual(mockTodo);
        expect(result.current.error).toBeNull();
    });

    it('handles addTodo success', async () => {
        jest.spyOn(TodoAPI, 'addTodo').mockResolvedValueOnce(mockTodo);

        const { result } = renderHook(() => useTodoStore());

        await act(async () => {
            await result.current.addTodo({ title: 'Test Todo', completed: false });
        });

        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0]).toEqual(mockTodo);
    });

    it('handles toggleTodo success', async () => {
        const toggledTodo = { ...mockTodo, completed: true };
        jest.spyOn(TodoAPI, 'updateTodo').mockResolvedValueOnce(toggledTodo);

        const { result } = renderHook(() => useTodoStore());
        useTodoStore.setState({ todos: [mockTodo] });

        await act(async () => {
            await result.current.toggleTodo('1');
        });

        expect(result.current.todos[0].completed).toBe(true);
    });

    it('handles removeTodo success', async () => {
        jest.spyOn(TodoAPI, 'deleteTodo').mockResolvedValueOnce();

        const { result } = renderHook(() => useTodoStore());
        useTodoStore.setState({ todos: [mockTodo] });

        await act(async () => {
            await result.current.removeTodo('1');
        });

        expect(result.current.todos).toHaveLength(0);
    });

    it('handles fetchTodos failure', async () => {
        jest.spyOn(TodoAPI, 'getTodos').mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTodoStore());

        await act(async () => {
            await result.current.fetchTodos();
        });

        expect(result.current.todos).toHaveLength(0);
        expect(result.current.error).toBe('Failed to fetch todos');
    });

    it('handles addTodo failure', async () => {
        jest.spyOn(TodoAPI, 'addTodo').mockRejectedValueOnce(new Error('Failed to add'));

        const { result } = renderHook(() => useTodoStore());

        await act(async () => {
            await result.current.addTodo({ title: 'Test Todo', completed: false });
        });

        expect(result.current.error).toBe('Failed to add todo');
    });

    it('handles toggleTodo failure', async () => {
        jest.spyOn(TodoAPI, 'updateTodo').mockRejectedValueOnce(new Error('Update failed'));

        const { result } = renderHook(() => useTodoStore());
        useTodoStore.setState({ todos: [mockTodo] });

        await act(async () => {
            await result.current.toggleTodo('1');
        });

        expect(result.current.error).toBe('Failed to toggle todo');
    });

    it('handles removeTodo failure', async () => {
        jest.spyOn(TodoAPI, 'deleteTodo').mockRejectedValueOnce(new Error('Delete failed'));

        const { result } = renderHook(() => useTodoStore());
        useTodoStore.setState({ todos: [mockTodo] });

        await act(async () => {
            await result.current.removeTodo('1');
        });

        expect(result.current.error).toBe('Failed to delete todo');
    });
}); 