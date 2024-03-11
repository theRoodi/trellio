import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useCallback, useEffect } from "react";
import { TasksStateType } from "app/App";
import { useAppDispatch, useAppSelector } from "app/state/store";
import {
  addTodoTC,
  changeTodolistTitleTC,
  FilterValuesType,
  removeTodoTC,
  setTodosTC,
  todoActions,
  TodolistDomainType,
} from "features/TodolistsList/Todolist/todolists-reducer";
import { tasksThunks } from "features/TodolistsList/Todolist/Task/tasks-reducer";
import { TaskStatuses } from "features/TodolistsList/api/todolists-api";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistsList/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { isLoggedInSelector } from "features/auth/model/auth.selector";
import { todoSelector } from "features/TodolistsList/Todolist/todo.selector";
import { taskSelector } from "features/TodolistsList/Todolist/Task/task.selector";

export const TodolistsList = () => {
  const todo = useAppSelector<Array<TodolistDomainType>>(todoSelector);
  const tasks = useAppSelector<TasksStateType>(taskSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(setTodosTC());
  }, []);

  const removeTask = useCallback(function (taskId: string, todoId: string) {
    dispatch(tasksThunks.removeTask({ todoId, taskId }));
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(tasksThunks.addTask({ todolistId, title }));
  }, []);

  const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }));
  }, []);

  const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
    dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }));
  }, []);

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    const action = todoActions.changeTodolistFilter({ id, filter });
    dispatch(action);
  }, []);

  const removeTodolist = useCallback(function (todoId: string) {
    dispatch(removeTodoTC(todoId));
  }, []);

  const changeTodolistTitle = useCallback(function (todoId: string, title: string) {
    dispatch(changeTodolistTitleTC(todoId, title));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodoTC(title));
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
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
