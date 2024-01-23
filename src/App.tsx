import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type TaskType = {
    id: number
    isDone: boolean
    title: string
}
function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 0, isDone: false, title: 'HTML'},
        {id: 1, isDone: true, title: 'CSS'},
        {id: 2, isDone: false, title: 'JSx'}
    ])

    const title = 'Learn'

    const removeTask = (taskId : number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    return (
        <div className="App">
            <Todolist title={title} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
