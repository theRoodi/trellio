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

    const removeTask = (taskId : string) => {
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

    return (
        <div className="App">
            <Todolist title={title} tasks={tasks} removeTask={removeTask} addTask={addTask}/>
        </div>
    );
}

export default App;
