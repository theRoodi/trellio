import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../Todolist';
import {AddItemForm} from '../AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
    addTodoTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodoTC,
    setTodosTC,
    TodolistDomainType
} from '../state/todolists-reducer'
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from '../state/tasks-reducer';
import {useAppDispatch, useAppSelector} from '../state/store';
import {TaskStatuses, TaskType} from '../api/todolists-api'
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const todo = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(setTodosTC())
    }, [])
    const removeTask = useCallback(function (taskId: string, todoId: string) {

        dispatch(removeTaskTC(todoId, taskId));
    }, []);

    const addTask = useCallback(function (title: string, todoId: string) {
        dispatch(addTaskTC(todoId, title));
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todoId: string) {
        dispatch(updateTaskStatusTC(todoId, taskId, status));
    }, []);

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todoId: string) {
        dispatch(updateTaskTitleTC(todoId, taskId, title));
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

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary" />}
            </AppBar>
            <Container fixed>
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
            </Container>
        </div>
    );
}

export default App;
