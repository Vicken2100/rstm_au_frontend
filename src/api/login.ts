import { ANONYMOUS_API } from ".";
import { LoginPayload, LoginResult } from "../dto/auth.dto";
import { Responses } from "../dto/common.dto";

export const login = async (paylaod: LoginPayload): Promise<LoginResult> => {
    const response = await ANONYMOUS_API.post<Responses<LoginResult>>("/auth", paylaod);

    return response.data.data;
};
