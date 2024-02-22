import {TodolistsType} from '../App';
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC, todoReducer} from './todoReducer';

let todoId1: string
let todoId2: string
let startState: TodolistsType[]

beforeEach(() => {
    todoId1 = 'todo1'
    todoId2 = 'todo2'

    startState = [
        {id: todoId1, title: 'title1', filter: 'all'},
        {id: todoId1, title: 'title1', filter: 'all'},
    ]
})
test('remove todo', () => {

    const endState = todoReducer(startState, removeTodoAC(todoId2))
    expect(endState[0].id).toBe(todoId1)
})


test('add todo', () => {
    const endState = todoReducer(startState, addTodoAC('title3'))


    expect(endState.length).toBe(3)
})

test('change todo title', () => {
    const endState = todoReducer(startState, changeTodoTitleAC(todoId1, 'title3'))


    expect(endState[0].title).toBe('title3')
})

test('change todo filter', () => {
    const endState = todoReducer(startState, changeTodoFilterAC(todoId1, 'active'))


    expect(endState[0].filter).toBe('active')
})