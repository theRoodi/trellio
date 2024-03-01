import {AddTodolistActionType, RemoveTodolistActionType, SetTodosType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {setAppErrorAC, SetErrorType, setAppStatusAC, SetStatusType} from '../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskActionType = ReturnType<typeof updateTaskAC>

type SetTaskType = ReturnType<typeof setTaskAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosType
    | SetTaskType
    | SetStatusType
    | SetErrorType

enum RESULT_CODE {
    SUCCEEDED = 0,
    FAILED = 1,
    RECAPTCHA_FAILED = 2
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODO':
            const copy = {...state}
            action.todos.forEach(t => {
                copy[t.id] = []
            })
            return copy
        case 'SET-TASK':
            return {
                ...state,
                [action.todoId]: action.tasks
            }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todo.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}

export const setTaskAC = (todoId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASK', tasks, todoId} as const
}

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todoId)
        .then(res => {
            dispatch(setTaskAC(todoId, res.data.items))
            dispatch(setAppStatusAC('successed'))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todoId))
            dispatch(setAppStatusAC('successed'))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('successed'))
            } else {
                handleServerAppError<{item:TaskType}>(res.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC('successed'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(e => {
                handleServerNetworkError(e, dispatch)
            })
    }