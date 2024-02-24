import React, {useCallback, useEffect} from 'react';
import './App.css';
import {FilterType} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoAC, setTodoTC} from './state/todoReducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch, useAppSelector} from './state/store';
import {TodolistWithRedux} from './TodolistWithRedux';


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {
    const todolists = useAppSelector<TodolistsType[]>(state => state.todos)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodoTC())
    }, [])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoAC(title))
    }, [dispatch])
    const lists = todolists.map(t => (
        <Grid item key={t.id}>
            <Paper style={{padding: '15px', margin: '15px'}}>
                <TodolistWithRedux todolist={t}/>
            </Paper>
        </Grid>
    ))

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin: '15px'}}>
                    <AddItemForm onClick={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {lists}
                </Grid>
            </Container>
        </div>
    )
        ;
}

export default AppWithRedux;
