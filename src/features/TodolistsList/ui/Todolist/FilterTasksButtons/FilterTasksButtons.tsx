import Button from "@mui/material/Button";
import React, { useCallback } from "react";
import { useActions } from "app/hooks/useActions";
import { FilterValuesType, todoActions, TodolistDomainType } from "features/TodolistsList/model/todo/todolists-slice";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilter } = useActions(todoActions);
  const { filter, id } = todolist;

  const changeTodoFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id });
  };
  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeTodoFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeTodoFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTodoFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
