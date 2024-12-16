import { AUTH_API } from ".";
import { List_Payload, ListResult, Responses } from "../dto/common.dto";
import { GajiResult } from "../dto/gaji.dto";


export const getGaji = async (payload: List_Payload): Promise<ListResult<GajiResult>> => {
    const response = await AUTH_API.get<Responses<ListResult<GajiResult>>>("/gaji", {
        params: payload,
    });

    return response.data.data;
};

