import { FormEvent, useState } from 'react';
import { useAppDispatch } from '@/app/store';
import { createTodoRequested } from '../todos-slice';
import './todos-form.scss';

const TodosForm = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    dispatch(createTodoRequested(trimmedText));
    setText('');
  };

  return (
    <form className="todos-form" onSubmit={handleSubmit}>
      <input
        className="todos-form__input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Введите задачу"
      />
      <button className="todos-form__button" type="submit">
        Добавить
      </button>
    </form>
  );
};

export default TodosForm;
