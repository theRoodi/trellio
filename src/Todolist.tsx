import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from './App';

export type FilterType = 'all' | 'completed' | 'active'

type Props = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (todoId: string, taskId: string) => void
    addTask: (todoId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void
    changeTodolists: (todoId: string, filter: FilterType) => void
    removeTodo: (todoId: string) => void
}

export const Todolist = (props: Props) => {


    const {
        id, title, tasks, filter,
        removeTask, addTask, changeTaskStatus, changeTodolists,
        removeTodo
    } = props
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
        changeTodolists(id, nextFilterValue)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const deleteTodoHandler = () => {
        removeTodo(id)
    }


    const onAddTask = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(id, taskTitle)
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
                removeTask(id, task.id)
            }
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(id, task.id, e.currentTarget.checked)
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
            <h3>
                {title}
                <button onClick={deleteTodoHandler}>X</button>
            </h3>

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