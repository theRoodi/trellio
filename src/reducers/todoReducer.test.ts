import {TodolistsType} from '../App';
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC, todoReducer} from './todoReducer';


test('remove todo', () => {
    let todoId1 = 'todo1'
    let todoId2 = 'todo2'

    const startState: TodolistsType[] = [
        {id: todoId1, title: 'title1', filter: 'all'},
        {id: todoId1, title: 'title1', filter: 'all'},
    ]
    const endState = todoReducer(startState, removeTodoAC(todoId2))


    expect(endState[0].id).toBe(todoId1)
})


test('add todo', () => {
    let todoId1 = 'todo1'
    let todoId2 = 'todo2'

    const startState: TodolistsType[] = [
        {id: todoId1, title: 'title1', filter: 'all'},
        {id: todoId1, title: 'title1', filter: 'all'},
    ]
    const endState = todoReducer(startState, addTodoAC('title3'))


    expect(endState[0].id).toBe('todo3')
})

test('change todo title', () => {
    let todoId1 = 'todo1'
    let todoId2 = 'todo2'

    const startState: TodolistsType[] = [
        {id: todoId1, title: 'title1', filter: 'all'},
        {id: todoId1, title: 'title1', filter: 'all'},
    ]
    const endState = todoReducer(startState, changeTodoTitleAC(todoId1 ,'title3'))


    expect(endState[0].title).toBe('title3')
})

test('change todo filter', () => {
    let todoId1 = 'todo1'
    let todoId2 = 'todo2'

    const startState: TodolistsType[] = [
        {id: todoId1, title: 'title1', filter: 'all'},
        {id: todoId1, title: 'title1', filter: 'all'},
    ]
    const endState = todoReducer(startState, changeTodoFilterAC(todoId1 ,'active'))


    expect(endState[0].filter).toBe('active')
})