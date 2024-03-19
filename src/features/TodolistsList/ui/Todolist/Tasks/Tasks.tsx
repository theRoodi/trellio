import { Task } from "features/TodolistsList/ui/Todolist/Tasks/Task/Task";
import React from "react";
import { TaskStatuses } from "common/enums/enum";
import { TodolistDomainType } from "features/TodolistsList/model/todo/todolists-slice";
import { TaskType } from "features/TodolistsList/api/task/tasks-api.types";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};
export const Tasks = ({ tasks, todolist }: Props) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      <div>{tasksForTodolist?.map((t) => <Task key={t.id} task={t} todolistId={todolist.id} />)}</div>
    </>
  );
};
