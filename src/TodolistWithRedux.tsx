import React, {ChangeEvent} from 'react';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {SuperCheckbox} from './components/SuperCheckbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {TodolistsType} from './AppWithRedux';
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from './reducers/todoReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';

export type FilterType = 'all' | 'completed' | 'active'

type Props = {
    todolist: TodolistsType
}

export const TodolistWithRedux = ({todolist}: Props) => {


    const {id, title, filter} = todolist

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch()
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
        dispatch(changeTodoFilterAC(id, nextFilterValue))
    }

    const deleteTodoHandler = () => {
        dispatch(removeTodoAC(id))
    }
    const updateTodoHandler = (title: string) => {
        dispatch(changeTodoTitleAC(id, title))
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(id,title))
    }
    const updateTaskHandler = (title: string, taskId: string) => {
        dispatch(changeTaskTitleAC(id, taskId, title))
    }
    const onChangeTaskStatus = (taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, isDone))
    }


    const listItems: Array<JSX.Element> = filteredTasks.map(task => {
            const onClickRemoveItem = () => {
                dispatch(removeTaskAC(id, task.id))
            }
            return (
                <li key={task.id}>
                    <SuperCheckbox isDone={task.isDone} onClick={(isDone) => onChangeTaskStatus(task.id, isDone)}/>
                    <EditableSpan title={task.title} onClick={(title) => updateTaskHandler(title, task.id)}/>
                    <IconButton onClick={onClickRemoveItem}>
                        <DeleteIcon/>
                    </IconButton>
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
                <EditableSpan title={title} onClick={updateTodoHandler}/>

                <IconButton onClick={deleteTodoHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm onClick={addTaskHandler}/>


            {tasksList}
            <div>
                <Button style={{marginRight: '10px'}} variant={filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => changeFilter('all')} color="success">All</Button>
                <Button style={{marginRight: '10px'}} variant={filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => changeFilter('active')} color="primary">Active</Button>
                <Button style={{marginRight: '10px'}} variant={filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => changeFilter('completed')} color="error">Completed</Button>
            </div>
        </div>
    )
}