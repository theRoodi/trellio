import React from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type TaskType = {
    id: number
    isDone: boolean
    title: string
}
function App() {

    const title = 'Learn'
    const title2 = 'Buy'
    const tasks: Array<TaskType> = [
        {id: 0, isDone: false, title: 'HTML'},
        {id: 1, isDone: false, title: 'CSS'},
        {id: 2, isDone: false, title: 'JS'}
    ]
    const tasks2: Array<TaskType> = [
        {id: 4, isDone: false, title: 'Хлеб'},
        {id: 5, isDone: false, title: 'Молоко'},
        {id: 6, isDone: false, title: 'Сок'}
    ]



    return (
        <div className="App">
            <Todolist title={title} tasks={tasks}/>
            <Todolist title={title2} tasks={tasks2}/>
        </div>
    );
}

export default App;
