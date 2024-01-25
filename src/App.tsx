import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

function App() {


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: crypto.randomUUID(), isDone: false, title: 'HTML'},
        {id: crypto.randomUUID(), isDone: true, title: 'CSS'},
        {id: crypto.randomUUID(), isDone: false, title: 'JSx'}
    ])

    const title = 'Learn'

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTaskId = crypto.randomUUID()
        const newTask: TaskType = {
            id: newTaskId,
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }

    const changeTaskStatus = (taskId: string, status: boolean) => {
        const updatedTasks: Array<TaskType> = tasks.map(task => task.id === taskId
            ? {...task, isDone: status}
            : task
        )
        setTasks(updatedTasks)
    }

    const changeTaskTitle = (taskId: string, title: string) => {
        const updatedTasks: Array<TaskType> = tasks.map(task => task.id === taskId
            ? {...task, title}
            : task
        )
        setTasks(updatedTasks)
    }

    return (
        <div className="App">
            <Todolist title={title}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}/>
        </div>
    );
}

export default App;
