import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import type { Todo } from '../todos-types';
import { selectTodos, selectTodosError, selectTodosLoading } from '../todos-selectors';
import { loadTodosRequested } from '../todos-slice';
import TodosItem from '../todos-item';
import './todos-list.scss';

const TodosList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const loading = useAppSelector(selectTodosLoading);
  const error = useAppSelector(selectTodosError);

  useEffect(() => {
    dispatch(loadTodosRequested());
  }, [dispatch]);

  if (loading && todos.length === 0) {
    return <p className="todos-list__status">Загрузка задач...</p>;
  }

  return (
    <section className="todos-list">
      <div className="todos-list__top">
        <h2 className="todos-list__title">Задачи</h2>
        {loading && <span className="todos-list__loading">обновление...</span>}
      </div>

      {error && <p className="todos-list__error">Ошибка: {error}</p>}

      {todos.length === 0 ? (
        <p className="todos-list__status">Пока задач нет</p>
      ) : (
        <ul className="todos-list__items">
          {todos.map((todo: Todo) => (
            <TodosItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TodosList;
