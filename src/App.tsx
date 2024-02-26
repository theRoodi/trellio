import React, {useReducer, useState} from 'react';
import './App.css';
import {FilterType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTaskAC, addTaskTC, changeTaskStatusAC, removeTaskAC, tasksReducer} from './state/tasksReducer';
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC, todoReducer} from './state/todoReducer';
import {TaskResponseType} from './api/todolist-api';


export type TaskType = {
    id: string
    completed: boolean
    title: string
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskStateType = {
    [key: string] : TaskResponseType[]
}


function App() {

    const todoId1 = crypto.randomUUID()
    const todoId2 = crypto.randomUUID()

    const [todolists, dispatchTodo] = useReducer(todoReducer, [
        {id: todoId1, title: 'What to buy', filter: 'all'},
        {id: todoId2, title: 'What to learn', filter: 'all'},
    ])


    // const [tasks, dispatchTask] = useReducer(tasksReducer, {
    //     [todoId1]: [
    //         {id: crypto.randomUUID(), completed: false, title: 'HTML'},
    //         {id: crypto.randomUUID(), completed: true, title: 'CSS'},
    //         {id: crypto.randomUUID(), completed: false, title: 'JSx'}
    //     ],
    //     [todoId2]: [
    //         {id: crypto.randomUUID(), completed: false, title: 'HTML2'},
    //         {id: crypto.randomUUID(), completed: true, title: 'CSS2'},
    //         {id: crypto.randomUUID(), completed: false, title: 'JSx2'}
    //     ]
    // })
    //
    // const removeTask = (todoId: string, taskId: string) => {
    //     dispatchTask(removeTaskAC(todoId, taskId))
    // }

    // const addTask = (todoId: string, title: string) => {
    //     dispatchTask(addTaskTC(todoId, title))
    // }

    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        // dispatchTask(changeTaskStatusAC(todoId, taskId, isDone))
    }


    const updateTask = (todoId: string, taskId: string, title: string) => {
        // setTasks({
        //     ...tasks,
        //     [todoId]: tasks[todoId].map(t => t.id === taskId
        //         ? {...t, title}
        //         : t)
        // })
    }

    const removeTodo = (todoId: string) => {
        dispatchTodo(removeTodoAC(todoId))
        // delete tasks[todoId]
    }

    const addTodolist = (title: string) => {
        dispatchTodo(addTodoAC(title))
    }

    const changeTodolists = (todoId: string, filter: FilterType) => {
        dispatchTodo(changeTodoFilterAC(todoId, filter))
    }

    const updateTodo = (todoId: string, title: string) => {
        dispatchTodo(changeTodoTitleAC(todoId, title))
    }
    const lists = todolists.map(i => (
        <Grid item>
            <Paper style={{padding: '15px', margin: '15px'}}>
                <Todolist key={i.id}
                          id={i.id}
                          title={i.title}
                          // tasks={tasks[i.id]}
                          filter={i.filter}
                          // removeTask={removeTask}
                          // addTask={addTask}
                          changeTaskStatus={changeTaskStatus}
                          changeTodolists={changeTodolists}
                          removeTodo={removeTodo}
                          updateTask={updateTask}
                          updateTodo={updateTodo}/>
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

export default App;
