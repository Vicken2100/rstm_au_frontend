import axios, { InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants/env";
import Cookies from "js-cookie";
import { USER_ACCESS_TOKEN } from "../constants/token";

export const AUTH_API = axios.create({
    baseURL: BASE_URL,
});

export const ANONYMOUS_API = axios.create({
    baseURL: BASE_URL,
});

const authInterceptors = async (req: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const accessToken = Cookies.get(USER_ACCESS_TOKEN);

    if (!accessToken) {
        return Promise.reject(new Error("Access Token not available"));
    }

    req.headers.Authorization = `Bearer ${accessToken}`;

    return req;
};

AUTH_API.interceptors.request.use(authInterceptors);
