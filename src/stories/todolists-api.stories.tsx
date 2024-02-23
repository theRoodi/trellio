import React, {useEffect, useState} from 'react'
import {todoAPI} from '../api/todolist-api';

export default {
    title: 'API/TODO',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoAPI.getTodo().then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoAPI.createTodo('newTodo').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const todolistId = '9474ce07-ffd0-4e88-bcc8-6212da430eb8'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoAPI.deleteTodo(todolistId).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const todolistId = '8cb0fff3-10a7-4c90-a3cb-45e5ae847bd5'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoAPI.updateTodo(todolistId, 'ggwp')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}