import { TaskPriorities, TaskStatuses } from "common/enums/enum";
import { UpdateDomainTaskModelType } from "features/TodolistsList/model/task/tasks-slice";

export type CreateTaskArgsType = {
  todolistId: string;
  title: string;
};
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type RemoveTaskArg = {
  todoId: string;
  taskId: string;
};

export type UpdateTasksArg = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};
