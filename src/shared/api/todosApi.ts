import type { Todo, TodoId } from '@/features/todos/todos-types';

const BASE_URL = 'https://6a0ef9b21736097c360af192.mockapi.io/todos';

export const todosApi = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  },

  async createTodo(text: string): Promise<Todo> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        completed: false,
      }),
    });
    const data = await response.json();
    return data;
  },

  async updateTodo(payload: Todo): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = response.json();
    return data;
  },

  async deleteTodo(id: TodoId): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = response.json();
    return data;
  },
};