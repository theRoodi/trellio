import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasksReducer';
import {todoReducer} from './todoReducer';
import  {thunk, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todos: todoReducer
})

// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


 //@ts-ignore
window.store = store

