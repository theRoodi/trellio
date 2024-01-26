import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from './App';

type FilterType = 'all' | 'completed' | 'active'

type Props = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Todolist = (props: Props) => {


    const {title, tasks, removeTask, addTask, changeTaskStatus, changeTaskTitle} = props
    const [filter, setFilter] = useState<FilterType>('all')
    const [taskTitle, setTaskTitle] = useState('')
    const [inputError, setInputError] = useState(false)
    const [toggle, setToggle] = useState(false)

    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterType): Array<TaskType> => {
        switch (filterValue) {
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

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setTaskTitle(e.currentTarget.value)
    }


    const onAddTask = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(taskTitle)
        } else {
            setInputError(true)
        }
        setTaskTitle('')
    }

    const userMessage = inputError
        ? <span style={{color: 'red'}}>Need minimum 1 symbol!</span>
        : taskTitle?.length < 15
            ? <span>Enter new title</span>
            : <span style={{color: 'red'}}>Title is too long!</span>

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onAddTask()
    const isAddBtnDisabled = !taskTitle || taskTitle.length >= 15

    const listItems: Array<JSX.Element> = filteredTasks.map(task => {
            const onClickRemoveItem = () => {
                removeTask(task.id)
            }
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked)
            }

            const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskTitle(task.id, e.currentTarget.title)
            }

            const toggleTitle = () => {
                const doubleTap = () => {
                    setToggle(!toggle)
                }
                return (
                    toggle
                        ? <span onDoubleClick={doubleTap} className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                        : <input onBlur={doubleTap}/>
                )
            }

            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatus}/>
                    <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
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
                <input value={taskTitle} onChange={onChangeTitle}
                       onKeyDown={onKeyDownAddTask}
                       className={inputError ? 'input-error' : ''}/>
                <button onClick={onAddTask} disabled={isAddBtnDisabled}>+</button>
                <div>{userMessage}</div>
            </div>
            {tasksList}
            <div>
                <button className={filter === 'all' ? 'activeBtn' : 'btn'} onClick={() => changeFilter('all')}>All
                </button>
                <button className={filter === 'active' ? 'activeBtn' : 'btn'}
                        onClick={() => changeFilter('active')}>Active
                </button>
                <button className={filter === 'completed' ? 'activeBtn' : 'btn'}
                        onClick={() => changeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    )
}