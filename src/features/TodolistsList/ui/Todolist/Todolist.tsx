import React, { useCallback } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { TodolistDomainType } from "features/TodolistsList/model/todo/todolists-slice";
import { TaskType } from "features/TodolistsList/api/task/tasks-api.types";
import { useActions } from "app/hooks/useActions";
import { tasksThunks } from "features/TodolistsList/model/task/tasks-slice";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
};

export const Todolist = React.memo(function ({ todolist, tasks }: Props) {
  const { addTask } = useActions(tasksThunks);

  const addTaskHandler = useCallback(
    (title: string) => {
      return addTask({ title, todolistId: todolist.id }).unwrap();
    },
    [todolist.id],
  );
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
