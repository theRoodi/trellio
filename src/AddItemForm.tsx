import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = {
    onClick: (itemTitle: string) => void
}


export const AddItemForm = (props: Props) => {
    const [itemTitle, setItemTitle] = useState('')
    const [inputError, setInputError] = useState<string | null>(null)

    const onAddItem = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            props.onClick(itemTitle)
        } else {
            setInputError('Title is required')
        }
        setItemTitle('')
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(null)
        setItemTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onAddItem()
    const isAddBtnDisabled = !itemTitle || itemTitle.length >= 15


    const userMessage = inputError
        ? <span style={{color: 'red'}}>Need minimum 1 symbol!</span>
        : itemTitle?.length < 15
            ? <span>Enter new title</span>
            : <span style={{color: 'red'}}>Title is too long!</span>

    const styleBtn = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        marginLeft: '10px'
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={userMessage}
                       variant="outlined"
                       value={itemTitle} onChange={onChangeTitle}
                       onKeyDown={onKeyDownAddTask}
                       className={inputError ? 'input-error' : ''}
                       size={'small'}
            />
            <Button style={styleBtn} onClick={onAddItem} disabled={isAddBtnDisabled} variant="contained">+</Button>
        </div>
    )
}