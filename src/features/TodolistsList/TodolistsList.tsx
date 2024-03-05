import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, {useCallback, useEffect} from 'react';
import {TasksStateType} from '../../app/App';
import {useAppDispatch, useAppSelector} from '../../state/store';
import {
    addTodoTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodoTC,
    setTodosTC,
    TodolistDomainType
} from '../../state/todolists-reducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../../state/tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {AddItemForm} from '../../AddItemForm';
import {Todolist} from '../../Todolist';
import {Navigate} from 'react-router-dom';


export const TodolistsList = () => {
    const todo = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(setTodosTC())
    }, [])

    const removeTask = useCallback(function (taskId: string, todoId: string) {
        dispatch(removeTaskTC(todoId, taskId));
    }, []);

    const addTask = useCallback(function (title: string, todoId: string) {
        dispatch(addTaskTC(todoId, title));
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todoId: string) {
        dispatch(updateTaskTC(taskId, {status}, todoId));
    }, []);

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todoId: string) {
        dispatch(updateTaskTC(taskId, {title}, todoId));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todoId: string) {
        const action = changeTodolistFilterAC(todoId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (todoId: string) {
        dispatch(removeTodoTC(todoId));
    }, []);

    const changeTodolistTitle = useCallback(function (todoId: string, title: string) {
        dispatch(changeTodolistTitleTC(todoId, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoTC(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todo.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
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
                    })
                }
            </Grid>
        </>
    )
}