import React, {useState} from 'react';
import {TaskType} from './App';

type FilterType = 'all' | 'completed' | 'active'

type Props = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

export const Todolist = (props: Props) => {


    const {title, tasks, removeTask} = props
    const [filter, setFilter] = useState<FilterType>('all')

    const getFilteredTasks = (allTasks:Array<TaskType>, filterValue: FilterType):Array<TaskType> => {
        switch (filterValue){
            case 'active':
                return allTasks.filter(task => !task.isDone)
            case 'completed':
                return allTasks.filter(task => task.isDone)
            default:
                return allTasks
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    const changeFilter = (nextFilterValue: FilterType) => {
        setFilter(nextFilterValue)
    }

    const listItems: Array<JSX.Element> = filteredTasks.map(task => {
            const onClickRemoveItem = () => {
                removeTask(task.id)
            }
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={onClickRemoveItem}>x</button>
                </li>
            )
        }
    )

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Empty</span>

    return (
        <div className="todolist">
            <h3>What to {title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}