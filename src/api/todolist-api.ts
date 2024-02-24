import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0fcfa52c-cba5-484d-ae0d-56dac03d5456'
    }
})

type TaskResponseType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
}

export const todoAPI = {
    getTodo() {
        return instance.get<TodoType[]>('todo-lists/')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>, AxiosResponse<ResponseType<{ item: TodoType }>>, { title: string }>('todo-lists/', {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, task: TaskResponseType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {task})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TodoType = {
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