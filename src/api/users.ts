import { AUTH_API } from ".";
import { List_Payload, ListResult, Responses } from "../dto/common.dto";
import { UpdateProfileRequest, UsersResult } from "../dto/users.dto";

export const getListUsersApi = async (payload: List_Payload): Promise<ListResult<UsersResult>> => {
    const response = await AUTH_API.get<Responses<ListResult<UsersResult>>>("/users", {
        params: payload,
    });

    return response.data.data;
};

export const getProfile = async (): Promise<UsersResult> => {
    const response = await AUTH_API.get<Responses<UsersResult>>("/users/profile");

    return response.data.data;
};

export const updateProfile = async (req: UpdateProfileRequest) => {
    const response = await AUTH_API.put("/users", req);

    return response;
};
