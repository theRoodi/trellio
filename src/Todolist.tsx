import React, {ChangeEvent} from 'react';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

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
                    <Checkbox checked={task.isDone} onChange={onChangeTaskStatus}/>
                    <EditableSpan title={task.title} onClick={(title) => updateTaskHandler(title, task.id)}/>
                    <IconButton onClick={onClickRemoveItem}>
                        <DeleteIcon/>
                    </IconButton>
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

                <IconButton onClick={deleteTodoHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm onClick={addTaskHandler}/>


            {tasksList}
            <div>
                <Button style={{marginRight: '10px'}} variant={filter === 'all' ? 'outlined' : 'contained'} onClick={() => changeFilter('all')} color="success">All</Button>
                <Button style={{marginRight: '10px'}} variant={filter === 'active' ? 'outlined' : 'contained'} onClick={() => changeFilter('active')} color="primary">Active</Button>
                <Button style={{marginRight: '10px'}} variant={filter === 'completed' ? 'outlined' : 'contained'} onClick={() => changeFilter('completed')} color="error">Completed</Button>
            </div>
        </div>
    )
}