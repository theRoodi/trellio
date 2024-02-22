import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasksReducer';
import {addTodoAC} from './todoReducer';
import {TaskStateType} from '../App';

let startState: TaskStateType

beforeEach(() => {
    startState = {
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
})

test('remove task', () => {


    const endState = tasksReducer(startState, removeTaskAC('todoId1', '2'))


    expect(endState).toEqual({
        ['todoId1']: [
            {id: '1', isDone: false, title: 'HTML'},
            {id: '3', isDone: false, title: 'JSx'}
        ],
        ['todoId2']: [
            {id: '1', isDone: false, title: 'HTML2'},
            {id: '2', isDone: true, title: 'CSS2'},
            {id: '3', isDone: false, title: 'JSx2'}
        ]
    })


})

test('add task', () => {
    const endState = tasksReducer(startState, addTaskAC('todoId1', 'React'))


    expect(endState['todoId1'].length).toBe(4)
    expect(endState['todoId2'].length).toBe(3)
    expect(endState['todoId1'][0].title).toBe('React')


})

test('change task status', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todoId1', '2', true))


    expect(endState['todoId1'][1].isDone).toBeTruthy()
})

test('change task title', () => {

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

    const endState = tasksReducer(startState, changeTaskTitleAC('todoId1', '2', 'React'))


    expect(endState['todoId1'][1].title).toBe('React')
})

test('add task when add new todo', () => {

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

    const endState = tasksReducer(startState, addTodoAC('newTodo'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoId1' && k !== 'todoId2')
    if (!newKey) {
        throw new Error('Error')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})