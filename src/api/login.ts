import { ANONYMOUS_API } from ".";
import { LoginPayload, LoginResult, RegisterPayload } from "../dto/auth.dto";
import { Responses } from "../dto/common.dto";
import { UsersResult } from "../dto/users.dto";

export const login = async (paylaod: LoginPayload): Promise<LoginResult> => {
    const response = await ANONYMOUS_API.post<Responses<LoginResult>>("/auth", paylaod);

    return response.data.data;
};

export const register = async (payload: RegisterPayload): Promise<UsersResult> => {
    const response = await ANONYMOUS_API.post<Responses<UsersResult>>("/auth/register", payload);

    return response.data.data;
};
