import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {RequestStatusType, setAppErrorAC, SetErrorType, setAppStatusAC, SetStatusType} from '../app/app-reducer';
import {handleServerNetworkError} from '../utils/error-utils';

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
export type SetEntityStatusType = ReturnType<typeof setEntityStatusAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | SetStatusType
    | ChangeTodolistFilterActionType | SetTodosType
    | SetErrorType | SetEntityStatusType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {

        case 'SET-TODO':
            return action.todos.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistDomainType = {...action.todo, filter: 'all', entityStatus: 'idle'}
            return [newTodo, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-ENTITY_STATUS':
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.entityStatus = action.entity;
            }
            return [...state]
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
export const setEntityStatusAC = (id: string, entity: RequestStatusType) => {
    return {type: 'SET-ENTITY_STATUS', id, entity} as const
}
export const setTodosTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('successed'))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const removeTodoTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setEntityStatusAC(todoId, 'loading'))
    todolistsAPI.deleteTodolist(todoId)
        .then(res => {
            dispatch(removeTodolistAC(todoId))
            dispatch(setAppStatusAC('successed'))
            dispatch(setEntityStatusAC(todoId, 'successed'))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
            dispatch(setEntityStatusAC(todoId, 'idle'))
        })
}

export const changeTodolistTitleTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todoId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todoId, title))
            dispatch(setAppStatusAC('successed'))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}