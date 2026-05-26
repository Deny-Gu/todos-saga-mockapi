# Todo List — React + TypeScript + Redux Toolkit + Redux Saga + MockAPI

## Стек

- React
- TypeScript
- Vite
- Redux Toolkit
- Redux Saga

## Что реализовано

- загрузка задач через `GET /todos`
- добавление задачи через `POST /todos`
- редактирование задачи через `PATCH /todos/:id`
- переключение `completed` через `PATCH /todos/:id`
- удаление задачи через `DELETE /todos/:id`

## API проекта / Структура Todo

```txt
https://6a0ef9b21736097c360af192.mockapi.io/todos
```

```ts
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
```

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```
