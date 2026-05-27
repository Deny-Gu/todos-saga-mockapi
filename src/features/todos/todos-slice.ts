import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo, TodoFilters, TodoId, TodosState } from './todos-types';

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadTodosRequested(state) {
      state.loading = true;
      state.error = null;
    },
    loadTodosSucceeded(state, action: PayloadAction<Todo[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    loadTodosFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createTodoRequested(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    createTodoSucceeded(state, action: PayloadAction<Todo>) {
      state.loading = false;
      state.items.push(action.payload);
    },
    createTodoFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updateTodoRequested(state, action: PayloadAction<Todo>) {
      state.loading = true;
      state.error = null;
    },
    updateTodoSucceeded(state, action: PayloadAction<Todo>) {
      state.loading = false;
      state.items = state.items.map((todo) => {
        if (todo.id !== action.payload.id) return todo;
        return action.payload;
      });
    },
    updateTodoFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    toggleTodoRequested(state, action: PayloadAction<TodoId>) {
      state.loading = true;
      state.error = null;
    },
    toggleTodoSucceeded(state, action: PayloadAction<Todo>) {
      state.loading = false;
      state.items = state.items.map((todo) => {
        if (todo.id !== action.payload.id) return todo;
        return action.payload;
      });
    },
    toggleTodoFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTodoRequested(state, action: PayloadAction<TodoId>) {
      state.loading = true;
      state.error = null;
    },
    deleteTodoSucceeded(state, action: PayloadAction<Todo>) {
      state.loading = false;
      state.items = state.items.filter((todo) => todo.id !== action.payload.id);
    },
    deleteTodoFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setFilter(state, action: PayloadAction<TodoFilters>) {
      state.filter = action.payload;
    },
  },
});

export const {
  loadTodosRequested,
  loadTodosSucceeded,
  loadTodosFailed,
  createTodoRequested,
  createTodoSucceeded,
  createTodoFailed,
  updateTodoRequested,
  updateTodoSucceeded,
  updateTodoFailed,
  toggleTodoRequested,
  toggleTodoSucceeded,
  toggleTodoFailed,
  deleteTodoRequested,
  deleteTodoSucceeded,
  deleteTodoFailed,
  setFilter,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
