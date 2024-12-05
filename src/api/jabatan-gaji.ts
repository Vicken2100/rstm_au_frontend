import { AUTH_API } from ".";
import { Responses } from "../dto/common.dto";
import { JabatanGajiResult } from "../dto/jabatan-gaji.dto";

export const getJabatanGajiApi = async (): Promise<JabatanGajiResult[]> => {
    const response = await AUTH_API.get<Responses<JabatanGajiResult[]>>("/jabatan-gaji");

    return response.data.data;
};

export const updateJabatanGajiApi = async (data: JabatanGajiResult[]): Promise<string> => {
    const response = await AUTH_API.put<Responses<string>>("/jabatan-gaji", { data });

    return response.data.data;
};
