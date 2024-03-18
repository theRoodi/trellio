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
  const { addTask } = useActions(tasksThunks);
  const { changeTodolistTitle, addTodo, removeTodo } = useActions(todoThunks);
  const { changeTodolistFilter } = useActions(todoActions);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(setTodosTC());
  }, []);

  const addTaskHandler = useCallback(function (title: string, todolistId: string) {
    addTask({ todolistId, title });
  }, []);

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    changeTodolistFilter({ id, filter });
  }, []);

  const removeTodolist = useCallback(function (id: string) {
    removeTodo({ id });
  }, []);

  const changeTodolistTitleHandler = useCallback(function (id: string, title: string) {
    changeTodolistTitle({ id, title });
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      addTodo({ title });
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
                <Todolist
                  id={tl.id}
                  title={tl.title}
                  tasks={allTodolistTasks}
                  entityStatus={tl.entityStatus}
                  changeFilter={changeFilter}
                  addTask={addTaskHandler}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitleHandler}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
