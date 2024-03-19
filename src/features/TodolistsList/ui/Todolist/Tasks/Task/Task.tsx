import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { TaskStatuses } from "common/enums/enum";
import { TaskType } from "features/TodolistsList/api/task/tasks-api.types";
import { useActions } from "app/hooks/useActions";
import { tasksThunks } from "features/TodolistsList/model/task/tasks-slice";
import style from "features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};
export const Task = React.memo(({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: task.id, todoId: todolistId });

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({
      taskId: task.id,
      domainModel: { status },
      todolistId,
    });
  };

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      updateTask({ taskId: task.id, domainModel: { title }, todolistId });
    },
    [task.id, todolistId],
  );

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? style.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
