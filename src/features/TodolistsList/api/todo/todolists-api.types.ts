export type CreateTodoArgs = {
  title: string;
};
export type UpdateTodoArg = {
  id: string;
  title: string;
};
export type RemoveTodoArg = {
  id: string;
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
