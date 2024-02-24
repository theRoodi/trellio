import {TaskStateType, TaskType} from '../App';
import {AddTodoType, RemoveTodoType, SetTodoType} from './todoReducer';
import {Dispatch} from 'redux';
import {todoAPI} from '../api/todolist-api';

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'SET-TODOS':
            const copy = {...state}
            action.todos.forEach(t => {
                copy[t.id] = []
            })
            return copy
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todoId] : action.payload.tasks
            }
        case 'ADD-TASK':
            const newTaskId = crypto.randomUUID()
            const newTask: TaskType = {
                id: newTaskId,
                title: action.payload.title,
                isDone: false
            }
            return {
                ...state,
                [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.taskId)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        case 'ADD-TODO':
            // const id = crypto.randomUUID()
            return {...state, [action.payload.todoId]: []}

        case 'REMOVE-TODO':
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        default:
            return state
    }
}


type ActionType = RemoveTaskType | AddTaskType |
    ChangeTaskStatusType | ChangeTaskTitleType |
    AddTodoType | RemoveTodoType | SetTodoType |
    SetTaskType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type SetTaskType = ReturnType<typeof setTasksAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoId, taskId}
    } as const
}

export const addTaskAC = (todoId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todoId, title}
    } as const
}

export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoId, taskId, isDone
        }
    } as const
}

export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoId, taskId, title
        }
    } as const
}

export const setTasksAC = (todoId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todoId, tasks
        }
    } as const
}

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    todoAPI.getTasks(todoId)
        .then(res => dispatch(setTasksAC(todoId, res.data)))
}