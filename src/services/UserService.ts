import axios from "axios";
import api, { type ApiErrorResponse, type ApiResult } from "./api";

type UserInsertedResponse = {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}

type UserUpdatedResponse = {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}

type UserLoginResponse = {
    accessToken: string
    accessTokenExpiresIn: number
}

const UserService = {

    register: async (userData: { name: string; email: string; password: string; }): Promise<ApiResult<UserInsertedResponse>> => {
        try {
            const res = await api.post<UserInsertedResponse, UserInsertedResponse>("/users/register", userData);
            return { data: res };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    },
    update: async (userData: { name: string; email: string; }, token: string): Promise<ApiResult<UserUpdatedResponse>> => {
        try {
            const res = await api.post<UserUpdatedResponse, UserUpdatedResponse>("/users/login", userData);
            return { data: res };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    },
    delete: async (token: string): Promise<ApiResult<void>> => {
        try {
            await api.delete<void, void>("/users/");
            return { data: undefined };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    },
    login: async (userData: { email: string; password: string; }): Promise<ApiResult<UserLoginResponse>> => {
        try {
            const res = await api.post<UserLoginResponse, UserLoginResponse>("/users/login", userData);
            return { data: res };
        } catch (error) {
            if (!axios.isAxiosError<ApiErrorResponse>(error)) throw error;

            return { error: error.response?.data };
        }
    }

}

export default UserService;