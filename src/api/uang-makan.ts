import { AUTH_API } from ".";
import { Responses } from "../dto/common.dto";
import { UangMakanResult } from "../dto/uang-makan.dto";

export const getUangMakanApi = async (): Promise<UangMakanResult[]> => {
    const response = await AUTH_API.get<Responses<UangMakanResult[]>>("/uang-makan");

    return response.data.data;
};

export const createUangMakanApi = async (data: UangMakanResult): Promise<string> => {
    const response = await AUTH_API.post<Responses<string>>("/uang-makan", data);

    return response.data.data;
};

export const deleteUangMakanApi = async (xid: string): Promise<string> => {
    const response = await AUTH_API.delete<Responses<string>>(`/uang-makan/${xid}`);

    return response.data.data;
};
