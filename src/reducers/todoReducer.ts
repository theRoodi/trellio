import {TodolistsType} from '../App';


export const todoReducer = (state: TodolistsType[], action: ActionType): TodolistsType[] => {

    switch(action.type) {
        case 'REMOVE-TODO':
            return state.filter(t => t.id !== action.payload.id)

        default: return state
    }

}

type ActionType = AddTodoType | RemoveTodoType

type AddTodoType = ReturnType<typeof addTodoAC>
type RemoveTodoType = ReturnType<typeof removeTodoAC>

export const addTodoAC = (title: string) => {
    return {
        type: 'ADD-TODO',
        payload: {title}
    }as const
}

export const removeTodoAC = (id: string) => {
    return {
        type: 'REMOVE-TODO',
        payload: {id}
    }as const
}