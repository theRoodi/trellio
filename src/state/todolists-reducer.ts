import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {setStatusAC, SetStatusType} from '../app/app-reducer';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todo: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type SetTodosType = ReturnType<typeof setTodosAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | SetStatusType
    | ChangeTodolistFilterActionType | SetTodosType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SET-TODO':
            return action.todos.map(t => ({...t, filter: 'all'}))
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistDomainType = {...action.todo, filter: 'all'}
            return [newTodo, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todo: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todo}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodosAC = (todos: TodolistType[]) => {
    return {type: 'SET-TODO', todos} as const
}
export const setTodosTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('successed'))
        })
}

export const removeTodoTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.deleteTodolist(todoId)
        .then(res => {
            dispatch(removeTodolistAC(todoId))
            dispatch(setStatusAC('successed'))
        })
}

export const changeTodolistTitleTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.updateTodolist(todoId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todoId, title))
            dispatch(setStatusAC('successed'))
        })
}