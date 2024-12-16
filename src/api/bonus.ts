import { AUTH_API } from ".";
import { Responses } from "../dto/common.dto";
import { BonusResult } from "../dto/bonus.dto";

export const getBonusApi = async (): Promise<BonusResult[]> => {
    const response = await AUTH_API.get<Responses<BonusResult[]>>("/Bonus");

    return response.data.data;
};

export const createBonusApi = async (data: BonusResult): Promise<string> => {
    const response = await AUTH_API.post<Responses<string>>("/Bonus", data);

    return response.data.data;
};

export const deleteBonusApi = async (xid: string): Promise<string> => {
    const response = await AUTH_API.delete<Responses<string>>(`/Bonus/${xid}`);

    return response.data.data;
};

