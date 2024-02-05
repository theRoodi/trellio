import {TodolistsType} from '../App';
import {removeTodoAC, todoReducer} from './todoReducer';


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