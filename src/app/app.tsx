import TodosForm from '../features/todos/todos-form';
import TodosList from '../features/todos/todos-list';
import './app.scss';

const App = () => {
  return (
    <main className="app">
      <section className="app__card">
        <div className="app__header">
          <h1 className="app__title">Todo List</h1>
        </div>
        <TodosForm />
        <TodosList />
      </section>
    </main>
  );
};

export default App;
