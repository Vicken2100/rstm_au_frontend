import { UsersResult } from "./users.dto";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResult extends UsersResult {
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
