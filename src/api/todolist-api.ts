import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY' : '0fcfa52c-cba5-484d-ae0d-56dac03d5456'
    }
})

export const todoAPI = {
    getTodo() {
        return instance.get<TodoType[]>('todo-lists/')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{item:TodoType}>>('todo-lists/', {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`,{title})
    }
}

type TodoType = {
    addedDate: Date
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}