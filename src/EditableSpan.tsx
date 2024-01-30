import React, {ChangeEvent, useState} from 'react';

type Props = {
    title: string
    onClick: (title: string) => void
}
export const EditableSpan = (props: Props) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onEditHandler = () => {
        setEdit(!edit)
        if (edit) props.onClick(newTitle)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input autoFocus onBlur={onEditHandler} value={newTitle} onChange={onChangeTitle}/>
            : <span onDoubleClick={onEditHandler}>{props.title}</span>



    )
}