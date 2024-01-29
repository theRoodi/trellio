import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from './Todolist';


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

    console.log(tasks)
    const lists = todolists.map(i => (
        <Todolist key={i.id}
                  id={i.id}
                  title={i.title}
                  tasks={tasks[i.id]}
                  filter={i.filter}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTodolists={changeTodolists}
                  removeTodo={removeTodo}/>
    ))

    return (
        <div className="App">
            {lists}
        </div>
    );
}

export default App;
