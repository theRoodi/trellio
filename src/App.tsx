import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}


function App() {

    const todoId1 = crypto.randomUUID()
    const todoId2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todoId1, title: 'What to buy', filter: 'all'},
        {id: todoId2, title: 'What to learn', filter: 'all'},
    ])


    const [tasks, setTasks] = useState({
        [todoId1]: [
            {id: crypto.randomUUID(), isDone: false, title: 'HTML'},
            {id: crypto.randomUUID(), isDone: true, title: 'CSS'},
            {id: crypto.randomUUID(), isDone: false, title: 'JSx'}
        ],
        [todoId2]: [
            {id: crypto.randomUUID(), isDone: false, title: 'HTML2'},
            {id: crypto.randomUUID(), isDone: true, title: 'CSS2'},
            {id: crypto.randomUUID(), isDone: false, title: 'JSx2'}
        ]
    })

    const removeTask = (todoId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].filter(t => t.id != taskId)
        })
    }

    const addTask = (todoId: string, title: string) => {
        const newTaskId = crypto.randomUUID()
        const newTask: TaskType = {
            id: newTaskId,
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todoId]: [...tasks[todoId], newTask]
        })
    }

    const addTodolist = (title: string) => {
        const id = crypto.randomUUID()

        const newTodo: TodolistsType = {
            id,
            title,
            filter: 'all'
        }

        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [id]: []})
    }

    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {

        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map(t => t.id === taskId
                ? {...t, isDone}
                : t)
        })
    }

    const changeTodolists = (todoId: string, filter: FilterType) => {
        setTodolists(
            todolists.map(el => el.id === todoId ? {...el, filter} : el)
        )
    }


    const removeTodo = (todoId: string) => {
        setTodolists(todolists.filter(t => t.id !== todoId))
        delete tasks[todoId]
    }


    const updateTask = (todoId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map(t => t.id === taskId
                ? {...t, title}
                : t)
        })
    }

    const updateTodo = (todoId: string, title: string) => {
        setTodolists(
            todolists.map(el => el.id === todoId ? {...el, title} : el)
        )
    }
    const lists = todolists.map(i => (
        <Grid item>
            <Paper style={{padding: '15px', margin: '15px'}}>
                <Todolist key={i.id}
                          id={i.id}
                          title={i.title}
                          tasks={tasks[i.id]}
                          filter={i.filter}
                          removeTask={removeTask}
                          addTask={addTask}
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
