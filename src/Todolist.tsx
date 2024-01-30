import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    updateTask: (todoId: string, taskId: string, title: string) => void
    updateTodo: (todoId: string, title: string) => void
}

export const Todolist = (props: Props) => {


    const {
        id, title, tasks, filter,
        removeTask, addTask, changeTaskStatus, changeTodolists,
        removeTodo, updateTask, updateTodo
    } = props

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

    const deleteTodoHandler = () => {
        removeTodo(id)
    }

    const addTaskHandler = (title: string) => {
        addTask(id, title)
    }
    const updateTaskHandler = (title: string, taskId: string) => {
        updateTask(id, taskId, title)
    }


    const listItems: Array<JSX.Element> = filteredTasks.map(task => {
            const onClickRemoveItem = () => {
                removeTask(id, task.id)
            }
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(id, task.id, e.currentTarget.checked)
            }
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatus}/>
                    <EditableSpan title={task.title} onClick={(title) => updateTaskHandler(title, task.id)}/>
                    <button onClick={onClickRemoveItem}>x</button>
                </li>
            )
        }
    )

    const updateTodoHandler = (title: string) => {
        updateTodo(id, title)
    }

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Empty</span>

    return (
        <div className="todolist">
            <h3>
                <EditableSpan title={title} onClick={updateTodoHandler}/>

                <button onClick={deleteTodoHandler}>X</button>
            </h3>
            <AddItemForm onClick={addTaskHandler}/>


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