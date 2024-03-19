import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useCallback, useEffect } from "react";
import { TasksStateType } from "app/App";
import { useAppDispatch, useAppSelector } from "app/state/store";
import {
  FilterValuesType,
  selectTodos,
  setTodosTC,
  todoActions,
  TodolistDomainType,
  todoThunks,
} from "features/TodolistsList/model/todo/todolists-slice";
import { selectTasks, tasksThunks } from "features/TodolistsList/model/task/tasks-slice";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { isLoggedInSelector } from "features/auth/model/auth.selector";
import { useActions } from "app/hooks/useActions";

export const TodolistsList = () => {
  const todo = useAppSelector<Array<TodolistDomainType>>(selectTodos);
  const tasks = useAppSelector<TasksStateType>(selectTasks);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const dispatch = useAppDispatch();
  const { addTodo } = useActions(todoThunks);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(setTodosTC());
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      return addTodo({ title }).unwrap();
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todo.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
