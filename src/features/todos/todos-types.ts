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
  filter: string;
};

export enum TodoFilters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type TodoFilter = {
  value: TodoFilters; 
  label: string;
}

