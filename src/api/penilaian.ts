import { AUTH_API } from ".";
import { Responses } from "../dto/common.dto";
import { PenilaianResult } from "../dto/penilaian.dto";

export const getPenilaianApi = async (): Promise<PenilaianResult[]> => {
    const response = await AUTH_API.get<Responses<PenilaianResult[]>>("/penilaian");

    return response.data.data;
};

export const updatePenilaianApi = async (payload: PenilaianResult[]): Promise<string> => {
    const response = await AUTH_API.put<Responses<string>>("/penilaian", { data: payload });

    return response.data.data;
};
