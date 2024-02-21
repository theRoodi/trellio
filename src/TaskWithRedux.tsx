import React, {memo} from 'react';
import {SuperCheckbox} from './components/SuperCheckbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './AppWithRedux';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';

type Props = {
    task: TaskType
    todoId: string
}


export const TaskWithRedux = memo(({task, todoId}: Props) => {

    const dispatch = useDispatch()

    const removeHandler = () => dispatch(removeTaskAC(todoId, task.id))
    const changeTaskStatusHandler = (isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoId, task.id, isDone))
    }
    const updateTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC(todoId, task.id, title))
    }


    return (
        <li key={task.id}>
            <SuperCheckbox isDone={task.isDone} onClick={changeTaskStatusHandler}/>
            <EditableSpan title={task.title} onClick={updateTaskTitleHandler}/>
            <IconButton onClick={removeHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})
