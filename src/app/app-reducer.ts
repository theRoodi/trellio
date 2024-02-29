export type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'

type InitialStateType = typeof initialState
type ActionType = SetStatusType | SetErrorType

export type SetStatusType = ReturnType<typeof setStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}


export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}



