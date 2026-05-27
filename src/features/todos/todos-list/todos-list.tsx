import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { TodoFilters, type Todo, type TodoFilter } from '../todos-types';
import { selectTodoFilter, selectTodos, selectTodosError, selectTodosLoading, selectTodosStats, selectVisibleTodos } from '../todos-selectors';
import { loadTodosRequested, setFilter } from '../todos-slice';
import TodosItem from '../todos-item';
import './todos-list.scss';

const filters: TodoFilter[] = [
  { value: TodoFilters.All, label: 'Все' },
  { value: TodoFilters.Active, label: 'Активные' },
  { value: TodoFilters.Completed, label: 'Выполненные' },
];

const TodosList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectVisibleTodos);
  const loading = useAppSelector(selectTodosLoading);
  const error = useAppSelector(selectTodosError);
  const activeFilter = useAppSelector(selectTodoFilter);
  const stats = useAppSelector(selectTodosStats);

  useEffect(() => {
    dispatch(loadTodosRequested());
  }, [dispatch]);

  if (loading && todos.length === 0) {
    return <p className="todos-list__status">Загрузка задач...</p>;
  }

  return (
    <section className="todos-list">
      <div className="todos-list__panel">
        <div className="todos-list__filters" aria-label="Фильтр задач">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={
                activeFilter === filter.value ? "todos-list__active-filter-button" : "todos-list__filter-button"
              }
              type="button"
              onClick={() => dispatch(setFilter(filter.value))}
            >
              {`${filter.label}: ${stats[filter.value]}`}
            </button>
          ))}
        </div>
      </div>
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
