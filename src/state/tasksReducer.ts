import {TaskStateType} from '../App';
import {AddTodoType, RemoveTodoType, SetTodoType} from './todoReducer';
import {Dispatch} from 'redux';
import {TaskResponseType, TaskStatuses, todoAPI, UpdateTaskType} from '../api/todolist-api';
import {AppRootStateType} from './store';

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
                [action.payload.todoId]: action.payload.tasks
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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


type ActionType =
    RemoveTaskType | AddTaskType |
    ChangeTaskStatusType | ChangeTaskTitleType |
    AddTodoType | RemoveTodoType |
    SetTodoType | SetTaskType

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

export const addTaskAC = (task: TaskResponseType) => {
    return {
        type: 'ADD-TASK',
        payload: {task}
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

export const setTasksAC = (todoId: string, tasks: TaskResponseType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todoId, tasks
        }
    } as const
}

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    todoAPI.getTasks(todoId)
        .then(res => dispatch(setTasksAC(todoId, res.data.items)))
}

export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    todoAPI.deleteTask(todoId, taskId)
        .then(res => dispatch(removeTaskAC(todoId, taskId)))
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoAPI.createTask(todoListId, title)
        .then(res => dispatch(addTaskAC(res.data.data.item)))
}

export const updateTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoId].find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskType = {
            title: task.title,
            status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            completed: task.completed
        }
        todoAPI.updateTask(todoId, taskId, model)
    }
}