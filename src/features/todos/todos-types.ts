export type TodoId = string;

export type Todo = {
  id: TodoId;
  text: string;
  completed: boolean;
};

export type TodosState = {
  items: Todo[];
  loading: boolean;
  error: string | null;
};
