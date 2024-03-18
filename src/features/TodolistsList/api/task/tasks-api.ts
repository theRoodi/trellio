import { AxiosResponse } from "axios";
import { instance } from "common/api";
import { UpdateDomainTaskModelType } from "features/TodolistsList/model/task/tasks-slice";
import { TaskPriorities, TaskStatuses } from "common/enums/enum";
import { BaseResponseType } from "types/responce.types";
import {
  CreateTaskArgsType,
  GetTasksResponse,
  TaskType,
  UpdateTaskModelType,
} from "features/TodolistsList/api/task/tasks-api.types";
// api

export const tasksAPI = {
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
