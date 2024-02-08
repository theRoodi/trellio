import {TaskStateType, TaskType} from '../App';
import {AddTodoType, RemoveTodoType} from './todoReducer';

const initialState:TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
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
    AddTodoType | RemoveTodoType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
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