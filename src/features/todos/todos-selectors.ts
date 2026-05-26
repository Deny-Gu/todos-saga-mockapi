import type { RootState } from '@/app/store';
import type { TodoId } from './todos-types';

export const selectTodos = (state: RootState) => state.todos.items;

export const selectTodosLoading = (state: RootState) => state.todos.loading;

export const selectTodosError = (state: RootState) => state.todos.error;

export const selectTodoById = (state: RootState, id: TodoId) => {
  return state.todos.items.find((todo) => todo.id === id);
};
