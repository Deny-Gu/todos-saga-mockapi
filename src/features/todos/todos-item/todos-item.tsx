import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '@/app/store';
import type { Todo } from '../todos-types';
import { deleteTodoRequested, toggleTodoRequested, updateTodoRequested } from '../todos-slice';
import './todos-item.scss';

type TodosItemProps = {
  todo: Todo;
};

const TodosItem = ({ todo }: TodosItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch(toggleTodoRequested(todo.id));
  };

  const handleEditStart = () => {
    setText(todo.text);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setText(todo.text);
    setIsEditing(false);
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    dispatch(updateTodoRequested({ ...todo, text: trimmedText }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodoRequested(todo.id));
  };

  return (
    <li className="todos-item">
      <label className="todos-item__checkbox-label">
        <input
          className="todos-item__checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {isEditing ? (
        <form className="todos-item__edit-form" onSubmit={handleEditSubmit}>
          <input
            className="todos-item__edit-input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            autoFocus
          />
          <button className="todos-item__button" type="submit">
            Сохранить
          </button>
          <button className="todos-item__button todos-item__button--secondary" type="button" onClick={handleEditCancel}>
            Отмена
          </button>
        </form>
      ) : (
        <>
          <div className="todos-item__content">
            <span className={todo.completed ? 'todos-item__text todos-item__text--completed' : 'todos-item__text'}>
              {todo.text}
            </span>
          </div>

          <div className="todos-item__actions">
            <button className="todos-item__button" type="button" onClick={handleEditStart}>
              Изменить
            </button>
            <button className="todos-item__button todos-item__button--danger" type="button" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodosItem;