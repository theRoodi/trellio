import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent} from 'react';

type Props = {
    isDone: boolean
    onClick: (isDone: boolean) => void
}
export const SuperCheckbox = (props: Props) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onClick(e.currentTarget.checked)
    }


    return <Checkbox checked={props.isDone} onChange={onChangeHandler}/>
}