import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useCallback, useEffect } from "react";
import { TasksStateType } from "app/App";
import { useAppDispatch, useAppSelector } from "app/state/store";
import {
  FilterValuesType,
  setTodosTC,
  todoActions,
  TodolistDomainType,
  todoThunks,
} from "features/TodolistsList/Todolist/todolists-reducer";
import { tasksThunks } from "features/TodolistsList/Todolist/Task/tasks-reducer";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistsList/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { isLoggedInSelector } from "features/auth/model/auth.selector";
import { todoSelector } from "features/TodolistsList/Todolist/todo.selector";
import { taskSelector } from "features/TodolistsList/Todolist/Task/task.selector";
import { TaskStatuses } from "common/enums/enum";
import { useActions } from "app/hooks/useActions";

export const TodolistsList = () => {
  const todo = useAppSelector<Array<TodolistDomainType>>(todoSelector);
  const tasks = useAppSelector<TasksStateType>(taskSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const dispatch = useAppDispatch();
  const { addTask, removeTask, updateTask, getTasks } = useActions(tasksThunks);
  const { changeTodolistTitle, addTodo, removeTodo } = useActions(todoThunks);
  const { changeTodolistFilter } = useActions(todoActions);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(setTodosTC());
  }, []);

  const removeTaskHandler = useCallback(function (taskId: string, todoId: string) {
    removeTask({ todoId, taskId });
  }, []);

  const addTaskHandler = useCallback(function (title: string, todolistId: string) {
    addTask({ todolistId, title });
  }, []);
  const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    updateTask({ taskId, domainModel: { status }, todolistId });
  }, []);

  const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
    updateTask({ taskId, domainModel: { title }, todolistId });
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
                  removeTask={removeTaskHandler}
                  changeFilter={changeFilter}
                  addTask={addTaskHandler}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
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
