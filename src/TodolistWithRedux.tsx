import React, {memo, useCallback, useEffect} from 'react';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {TodolistsType} from './AppWithRedux';
import {changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from './state/todoReducer';
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskTC,
    getTasksTC, updateTaskStatusTC
} from './state/tasksReducer';
import {ButtonMemo} from './components/ButtonMemo';
import {Task} from './Task';
import {TaskStatuses} from './api/todolist-api';

export type FilterType = 'all' | 'completed' | 'active'

type Props = {
    todolist: TodolistsType
}

export const TodolistWithRedux = memo(({todolist}: Props) => {

    const {id, title, filter} = todolist
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [])

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterType): Array<TaskType> => {
        switch (filterValue) {
            case 'active':
                return allTasks.filter(task => !task.completed)
            case 'completed':
                return allTasks.filter(task => task.completed)
            default:
                return allTasks
        }
    }

    console.log('tasks' + ' ' + tasks)
    console.log('filter' + ' ' + filter)


    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    console.log('filteredTasks' + ' ' + filteredTasks)

    const changeFilter = useCallback((nextFilterValue: FilterType) => {
        dispatch(changeTodoFilterAC(id, nextFilterValue))
    }, [dispatch, id])
    const deleteTodoHandler = useCallback(() => {
        dispatch(removeTodoAC(id))
    }, [dispatch, id])
    const updateTodoHandler = useCallback((title: string) => {
        dispatch(changeTodoTitleAC(id, title))
    }, [dispatch, id])
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC(id, title))
    }, [dispatch, id])
    const updateTaskHandler = useCallback((title: string, taskId: string) => {
        dispatch(changeTaskTitleAC(id, taskId, title))
    }, [dispatch, id])
    const onChangeTaskStatus = useCallback((taskId: string, isDone: TaskStatuses) => {
        dispatch(updateTaskStatusTC (id, taskId, isDone))
    }, [dispatch, id])
    const onClickRemoveItem = useCallback((taskId: string) => {
        dispatch(deleteTaskTC(id, taskId))
    }, [id])


    const listItems: Array<JSX.Element> = filteredTasks.map(task => {
            return (
                <Task key={task.id}
                      task={task}
                      onClickRemoveItem={onClickRemoveItem}
                      onChangeTaskStatus={onChangeTaskStatus}
                      updateTaskHandler={updateTaskHandler}/>

                // <TaskWithRedux key={task.id} task={task} todoId={id}/>

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
                <ButtonMemo style={{marginRight: '10px'}}
                            variant={filter === 'all' ? 'outlined' : 'contained'}
                            onClick={() => changeFilter('all')}
                            color="success">All</ButtonMemo>
                <ButtonMemo style={{marginRight: '10px'}}
                            variant={filter === 'active' ? 'outlined' : 'contained'}
                            onClick={() => changeFilter('active')}
                            color="primary">Active</ButtonMemo>
                <ButtonMemo style={{marginRight: '10px'}}
                            variant={filter === 'completed' ? 'outlined' : 'contained'}
                            onClick={() => changeFilter('completed')}
                            color="error">Completed</ButtonMemo>
            </div>
        </div>
    )
})