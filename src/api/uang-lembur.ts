import { AUTH_API } from ".";
import { Responses } from "../dto/common.dto";
import { UangLemburResult } from "../dto/uang-lembur.dto";

export const getUangLemburApi = async (): Promise<UangLemburResult[]> => {
    const response = await AUTH_API.get<Responses<UangLemburResult[]>>("/uang-lembur");

    return response.data.data;
};

export const createUangLemburApi = async (data: UangLemburResult): Promise<string> => {
    const response = await AUTH_API.post<Responses<string>>("/uang-lembur", data);

    return response.data.data;
};

export const deleteUangLemburApi = async (xid: string): Promise<string> => {
    const response = await AUTH_API.delete<Responses<string>>(`/uang-lembur/${xid}`);

    return response.data.data;
};
