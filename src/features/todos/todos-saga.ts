import { all, AllEffect, call, ForkEffect, put, SagaReturnType, select, takeEvery } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { todosApi } from '@/shared/api/todosApi';
import type { Todo, TodoId } from './todos-types';
import { selectTodoById } from './todos-selectors';
import {
  createTodoFailed,
  createTodoRequested,
  createTodoSucceeded,
  deleteTodoFailed,
  deleteTodoRequested,
  deleteTodoSucceeded,
  loadTodosFailed,
  loadTodosRequested,
  loadTodosSucceeded,
  toggleTodoFailed,
  toggleTodoRequested,
  toggleTodoSucceeded,
  updateTodoFailed,
  updateTodoRequested,
  updateTodoSucceeded,
} from './todos-slice';

export function* loadTodosWorker() {
  try {
    const todos: Todo[] = yield call(todosApi.getTodos);
    yield put(loadTodosSucceeded(todos));
  } catch (error: unknown) {
    yield put(loadTodosFailed(error instanceof Error ? error.message : 'Ошибка'));
  }
}

export function* createTodoWorker(action: PayloadAction<string>) {
  try {
    const todo: Todo = yield call(todosApi.createTodo, action.payload);
    yield put(createTodoSucceeded(todo));
  } catch (error: unknown) {
    yield put(createTodoFailed(error instanceof Error ? error.message : 'Ошибка'));
  }
}

export function* updateTodoWorker(action: PayloadAction<Todo>) {
  try {
    const currentTodo: Todo | undefined = yield select((state: RootState) =>
      selectTodoById(state, action.payload.id),
    );

    if (!currentTodo) {
      throw new Error('Задача не найдена');
    }

    const updatedTodo: Todo = yield call(todosApi.updateTodo, action.payload);
    yield put(updateTodoSucceeded(updatedTodo));
  } catch (error: unknown) {
    yield put(updateTodoFailed(error instanceof Error ? error.message : 'Ошибка'));
  }
}

export function* toggleTodoWorker(action: PayloadAction<TodoId>) {
  try {
    const currentTodo: Todo | undefined = yield select((state: RootState) =>
      selectTodoById(state, action.payload),
    );

    if (!currentTodo) {
      throw new Error('Задача не найдена');
    }

    const updatedTodo: Todo = yield call(todosApi.updateTodo, {
      ...currentTodo,
      completed: !currentTodo.completed,
    });

    yield put(toggleTodoSucceeded(updatedTodo));
  } catch (error: unknown) {
    yield put(toggleTodoFailed(error instanceof Error ? error.message : 'Ошибка'));
  }
}

export function* deleteTodoWorker(action: PayloadAction<TodoId>) {
  try {
    const currentTodo: Todo | undefined = yield select((state: RootState) =>
      selectTodoById(state, action.payload),
    );

    if (!currentTodo) {
      throw new Error('Задача не найдена');
    }

    const deletedTodo: Todo = yield call(todosApi.deleteTodo, action.payload);
    yield put(deleteTodoSucceeded(deletedTodo));
  } catch (error: unknown) {
    yield put(deleteTodoFailed(error instanceof Error ? error.message : 'Ошибка'));
  }
}

function* loadTodosWatcher() {
  yield takeEvery(loadTodosRequested.type, loadTodosWorker);
}

function* createTodoWatcher() {
  yield takeEvery(createTodoRequested.type, createTodoWorker);
}

function* updateTodoWatcher() {
  yield takeEvery(updateTodoRequested.type, updateTodoWorker);
}

function* toggleTodoWatcher() {
  yield takeEvery(toggleTodoRequested.type, toggleTodoWorker);
}

function* deleteTodoWatcher() {
  yield takeEvery(deleteTodoRequested.type, deleteTodoWorker);
}

export function* todosSagaWatcher() {
  yield all([
    loadTodosWatcher(),
    createTodoWatcher(),
    updateTodoWatcher(),
    toggleTodoWatcher(),
    deleteTodoWatcher(),
  ]);
}
