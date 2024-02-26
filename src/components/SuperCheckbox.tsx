import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent} from 'react';
import {TaskStatuses} from '../api/todolist-api';

type Props = {
    isDone: TaskStatuses
    onClick: (isDone: boolean) => void
}
export const SuperCheckbox = (props: Props) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onClick(e.currentTarget.checked)
    }


    return <Checkbox checked={props.isDone} onChange={onChangeHandler}/>
}