import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import React, { useCallback } from "react";
import { TodolistDomainType, todoThunks } from "features/TodolistsList/model/todo/todolists-slice";
import { useActions } from "app/hooks/useActions";

type Props = {
  todolist: TodolistDomainType;
};
export const TodolistTitle = ({ todolist }: Props) => {
  const { removeTodo, changeTodolistTitle } = useActions(todoThunks);
  const { id, title, entityStatus } = todolist;
  const removeTodolist = () => {
    removeTodo({ id });
  };
  const changeTodoTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ id, title });
    },
    [id],
  );

  return (
    <>
      <h3>
        <EditableSpan value={title} onChange={changeTodoTitleHandler} />
        <IconButton onClick={removeTodolist} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
    </>
  );
};
