import type { RootState } from '@/app/store';
import { TodoFilters, type TodoId } from './todos-types';
import { createSelector } from '@reduxjs/toolkit'

export const selectTodos = (state: RootState) => state.todos.items;

export const selectTodosLoading = (state: RootState) => state.todos.loading;

export const selectTodosError = (state: RootState) => state.todos.error;

export const selectTodoFilter = (state: RootState) => state.todos.filter;

const selectTodoId = (_state: RootState, id: TodoId) => id;

export const selectTodoById = createSelector(
  [selectTodos, selectTodoId],
  (todos, id) => todos.find((todo) => todo.id === id)
);

export const selectTodosStatsCompleted = createSelector(
  [selectTodos], 
  (todos) => todos.filter((todo) => todo.completed).length
);

export const selectVisibleTodos = createSelector(
  [selectTodos, selectTodoFilter],
  (todos, filter) => {
    if (filter === TodoFilters.Active) {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === TodoFilters.Completed) {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  },
);

export const selectTodosStats = createSelector([selectTodos, selectTodosStatsCompleted], 
  (todos, completedCount) => {
  return {
    [TodoFilters.All]: todos.length,
    [TodoFilters.Active]: todos.length - completedCount,
    [TodoFilters.Completed]: completedCount,
  };
});