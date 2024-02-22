import {TaskStateType, TodolistsType} from '../App';
import {tasksReducer} from './tasksReducer';
import {addTodoAC, removeTodoAC, todoReducer} from './todoReducer';

test('ids equals', () => {
    const startTaskState: TaskStateType = {}
    const startTodoState: TodolistsType[] = []

    const action = addTodoAC('newTodo')

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodoState = todoReducer(startTodoState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodo = endTodoState[0].id

    expect(idFromTasks).toBe(action.payload.todoId)
    expect(idFromTodo).toBe(action.payload.todoId)

} )

test('todo and task delete', () => {
    const startState = {
        ['todoId1']: [
            {id: '1', isDone: false, title: 'HTML'},
            {id: '2', isDone: true, title: 'CSS'},
            {id: '3', isDone: false, title: 'JSx'}
        ],
        ['todoId2']: [
            {id: '1', isDone: false, title: 'HTML2'},
            {id: '2', isDone: true, title: 'CSS2'},
            {id: '3', isDone: false, title: 'JSx2'}
        ]
    }

    const action = removeTodoAC('todoId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoId2']).not.toBeDefined()

} )