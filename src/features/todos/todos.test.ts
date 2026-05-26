import { describe, expect, it } from 'vitest';
import { todosApi } from "@/shared/api/todosApi";
import { call, put } from "redux-saga/effects";
import { loadTodosSucceeded, loadTodosFailed, createTodoRequested, createTodoSucceeded, createTodoFailed } from "./todos-slice";
import { Todo } from "./todos-types";
import { loadTodosWorker, createTodoWorker} from './todos-saga';

const todo: Todo = {
  id: '1',
  text: 'Задача 1',
  completed: false,
};

describe('todosWorkers', () => {
  describe('loadTodosWorker', () => {
    it('success', () => {
      const generator = loadTodosWorker();

      expect(generator.next().value).toEqual(call(todosApi.getTodos));

      const todos: Todo[] = [todo];

      expect(generator.next(todos).value).toEqual(
        put(loadTodosSucceeded(todos)),
      );

      expect(generator.next().done).toBe(true);
    });

    it('error', () => {
      const generator = loadTodosWorker();

      expect(generator.next().value).toEqual(call(todosApi.getTodos));

      const error = new Error('Ошибка сервера');

      expect(generator.throw(error).value).toEqual(
        put(loadTodosFailed('Ошибка сервера')),
      );

      expect(generator.next().done).toBe(true);
    });

    it('unknown error', () => {
      const generator = loadTodosWorker();

      expect(generator.next().value).toEqual(call(todosApi.getTodos));

      expect(generator.throw('Ошибка').value).toEqual(
        put(loadTodosFailed('Ошибка')),
      );

      expect(generator.next().done).toBe(true);
    });
  });

  describe('createTodoWorker', () => {
    it('success', () => {
      const action = createTodoRequested('Новая задача');
      const generator = createTodoWorker(action);

      expect(generator.next().value).toEqual(
        call(todosApi.createTodo, 'Новая задача'),
      );

      expect(generator.next(todo).value).toEqual(
        put(createTodoSucceeded(todo)),
      );

      expect(generator.next().done).toBe(true);
    });

    it('error', () => {
      const action = createTodoRequested('Новая задача');
      const generator = createTodoWorker(action);

      expect(generator.next().value).toEqual(
        call(todosApi.createTodo, 'Новая задача'),
      );

      const error = new Error('Ошибка создания');

      expect(generator.throw(error).value).toEqual(
        put(createTodoFailed('Ошибка создания')),
      );

      expect(generator.next().done).toBe(true);
    });

    it('unknown error', () => {
      const action = createTodoRequested('Новая задача');
      const generator = createTodoWorker(action);

      expect(generator.next().value).toEqual(
        call(todosApi.createTodo, 'Новая задача'),
      );

      expect(generator.throw('Unknown error').value).toEqual(
        put(createTodoFailed('Ошибка')),
      );

      expect(generator.next().done).toBe(true);
    });
  });
});