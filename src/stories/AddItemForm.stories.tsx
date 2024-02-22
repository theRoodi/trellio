import type { Meta, StoryObj } from '@storybook/react';

import {AddItemForm, AddItemFormProps} from '../AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: 'Clicked button inside form',
      // action: 'clicked'
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
  args: {
    onClick: action('Clicked btn inside form')
  },
};


const ErrorAddItemForm = memo((props: AddItemFormProps) => {
  const [itemTitle, setItemTitle] = useState('')
  const [inputError, setInputError] = useState<string | null>('Title is required')

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
})

export const ErrorAddItemFormStory : Story = {
  render: () => <ErrorAddItemForm onClick={action('Clicked btn inside form error')} />
}