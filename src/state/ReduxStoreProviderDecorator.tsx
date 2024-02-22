import React from 'react';
import {AppRootStateType, store} from './store';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasksReducer';
import {v1} from 'uuid';
import {todoReducer} from './todoReducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todos: todoReducer
})

const initialGlobalState = {
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    },
    todos: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ]
};

// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);
export const storyBookStore = legacy_createStore(rootReducer );


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}