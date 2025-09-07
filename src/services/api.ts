import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json"
    }
});

export type ApiErrorResponse = {
    status: number
    timestamp: Date
    message: string
    fields?: FieldErrorResponse[]
}

export type FieldErrorResponse = {
    name: string
    message: string
}

export type ApiResult<T> = {
    data?: T
    error?: ApiErrorResponse
}

export default api;
