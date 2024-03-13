import { AxiosResponse } from "axios";
import { instance } from "common/api";
import { UpdateDomainTaskModelType } from "features/TodolistsList/Todolist/Task/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "common/enums/enum";
import { BaseResponseType } from "types/responce.types";
// api

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      { title: string }
    >("todo-lists", { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(`todo-lists/${id}`, {
      title,
    });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(args: CreateTaskArgsType) {
    return instance.post<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      { title: string }
    >(`todo-lists/${args.todolistId}/tasks`, { title: args.title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};

export type CreateTaskArgsType = {
  todolistId: string;
  title: string;
};

export type CreateTodoArgs = {
  title: string;
};

export type UpdateTasksArg = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};
export type UpdateTodoArg = {
  id: string;
  title: string;
};

export type RemoveTaskArg = {
  todoId: string;
  taskId: string;
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
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
