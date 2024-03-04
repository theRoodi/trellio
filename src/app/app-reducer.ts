export type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'

type InitialStateType = typeof initialState
type ActionType = SetStatusType | SetErrorType | SetIsInitializedType

export type SetStatusType = ReturnType<typeof setAppStatusAC>
export type SetErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setIsInitializedAC = (value: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        value
    } as const
}

export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}



