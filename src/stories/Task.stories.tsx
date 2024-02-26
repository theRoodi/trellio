import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React, {useState} from 'react';
import {Task} from '../Task';

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        task: {id: 'qwe', completed: true, title: 'titleIsDone'},
        onChangeTaskStatus: action('onChangeTaskStatus'),
        updateTaskHandler: action('updateTaskHandler'),
        onClickRemoveItem: action('onClickRemoveItem')
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};
export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: 'qw222e', completed: false, title: 'titleIsDone2'}
    }
};

const TaskToggle = () => {
    const [task, setTask] = useState({id: 'qw222e', completed: false, title: 'titleIsDone2'})

    return <Task task={task}
                 onChangeTaskStatus={() => setTask({...task, completed: !task.completed})}
                 updateTaskHandler={(title, taskId) => setTask({...task, title})}
                 onClickRemoveItem={action('onClickRemoveItem')}/>
}

export const TaskToggleStory: Story = {
    render: () => <TaskToggle/>
};

