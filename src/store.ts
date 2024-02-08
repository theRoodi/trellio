import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasksReducer';
import {todoReducer} from './reducers/todoReducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todos: todoReducer
})

export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>


 //@ts-ignore
window.store = store

