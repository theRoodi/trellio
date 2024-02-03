import {TaskType} from '../App';


export const tasksReducer = (state: any, action: ActionType): any => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTaskId = crypto.randomUUID()
            const newTask: TaskType = {
                id: newTaskId,
                title: action.payload.title,
                isDone: false
            }
            return [...state, newTask]
        case 'REMOVE-TASK':
            return state.filter(t => t[action.payload.todoId][0].id !== action.payload.taskId)
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        default:
            return state
    }
}


type ActionType = RemoveTaskType | AddTaskType | ChangeTaskStatusType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
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