import {TodolistsType} from '../App';
import {FilterType} from '../Todolist';


export const todoReducer = (state: TodolistsType[], action: ActionType): TodolistsType[] => {

    switch (action.type) {
        case 'REMOVE-TODO':
            return state.filter(t => t.id !== action.payload.id)
        case 'ADD-TODO':
            const id = 'todo3'

            const newTodo: TodolistsType = {
                id,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodo, ...state]

        case 'CHANGE-TODO-TITLE':
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)

        case 'CHANGE-TODO-FILTER':
            return state.map(t => t.id == action.payload.id ? {...t, filter: action.payload.filter} : t)

        default:
            return state
    }

}

type ActionType = AddTodoType | RemoveTodoType | ChangeTodoTitleType | ChangeTodoFilterType

type AddTodoType = ReturnType<typeof addTodoAC>
type RemoveTodoType = ReturnType<typeof removeTodoAC>
type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>
type ChangeTodoFilterType = ReturnType<typeof changeTodoFilterAC>

export const addTodoAC = (title: string) => {
    return {
        type: 'ADD-TODO',
        payload: {title}
    } as const
}

export const removeTodoAC = (id: string) => {
    return {
        type: 'REMOVE-TODO',
        payload: {id}
    } as const
}

export const changeTodoTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODO-TITLE',
        payload: {
            id, title
        }
    } as const
}
export const changeTodoFilterAC = (id: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODO-FILTER',
        payload: {
            id, filter
        }
    } as const
}