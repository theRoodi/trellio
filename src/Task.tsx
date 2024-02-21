import React, {memo} from 'react';
import {SuperCheckbox} from './components/SuperCheckbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './AppWithRedux';

type Props = {
    task: TaskType
    onChangeTaskStatus: (taskId: string, isDone: boolean) => void
    updateTaskHandler: (title: string, taskId: string) => void
    onClickRemoveItem: (taskId: string) => void
}


export const Task = memo(({task, onChangeTaskStatus, updateTaskHandler, onClickRemoveItem}: Props) => {
    return (
        <li key={task.id}>
            <SuperCheckbox isDone={task.isDone} onClick={(isDone) => onChangeTaskStatus(task.id, isDone)}/>
            <EditableSpan title={task.title} onClick={(title) => updateTaskHandler(title, task.id)}/>
            <IconButton onClick={() => onClickRemoveItem(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})
