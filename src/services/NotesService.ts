import axios, { Axios, type AxiosResponse } from "axios";
import api, { type ApiErrorResponse, type ApiResult } from "./api";

type AuthorNoteInsertedResponse = {
    id: string
    name: string
}

type NoteInsertedResponse = {
    id: string
    title: string
    body: string
    author: AuthorNoteInsertedResponse
    createdAt: Date
    updatedAt: Date
}

type AuthorNoteUpdatedResponse = {
    id: string
    name: string
}

type NoteUpdatedResponse = {
    id: string
    title: string
    body: string
    author: AuthorNoteUpdatedResponse
    createdAt: Date
    updatedAt: Date
}

type NoteAuthorResponse = {
    id: string
    title: string
    createdAt: Date
    updatedAt: Date
}

const NotesService = {

    create: async (noteDate: { title: string; body: string; }, authorId: string, token: string): Promise<ApiResult<NoteInsertedResponse>> => {
        try {
            const res = await api.post<NoteInsertedResponse, AxiosResponse<NoteInsertedResponse>>(`/author/${authorId}/notes`, noteDate, { headers: { Authorization: `Bearer ${token}` } });
            return { data: res.data };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    },

    update: async (id: string, noteDate: { title: string; body: string; }, authorId: string, token: string): Promise<ApiResult<NoteUpdatedResponse>> => {
        try {
            const res = await api.put<NoteUpdatedResponse, AxiosResponse<NoteUpdatedResponse>>(`/author/${authorId}/notes/${id}`, noteDate, { headers: { Authorization: `Bearer ${token}` } });
            return { data: res.data };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    },

    delete: async (id: string, authorId: string, token: string): Promise<ApiResult<void>> => {
        try {
            await api.delete<void, void>(`/author/${authorId}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            return { data: undefined };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    },

    findByAuthor: async (authorId: string, query: string, token: string): Promise<ApiResult<NoteAuthorResponse[]>> => {
        try {
            const res = await api.get<NoteAuthorResponse[], AxiosResponse<NoteAuthorResponse[]>>(`/author/${authorId}/notes?query=${query}`, { headers: { Authorization: `Bearer ${token}` } });
            return { data: res.data };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    }

}