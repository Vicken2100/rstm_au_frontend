import { AUTH_API } from ".";
import { List_Payload, ListResult, Responses } from "../dto/common.dto";
import { AttendanceStats, PresensiResult, PresensiStats } from "../dto/presensi.dto";

export const getStatsApi = async (month: number, jabatan: string | null): Promise<AttendanceStats[]> => {
    const query: Record<string, string> = {};

    if (jabatan) {
        query.jabatan = jabatan;
    }

    const response = await AUTH_API.get<Responses<AttendanceStats[]>>(`/presensi/${month}/stats`, {
        params: query,
    });

    return response.data.data;
};

export const getStatsInformationApi = async (month: number, jabatan: string | null): Promise<PresensiStats[]> => {
    const query: Record<string, string> = {};

    if (jabatan) {
        query.jabatan = jabatan;
    }

    const response = await AUTH_API.get<Responses<PresensiStats[]>>(`/presensi/${month}/information`, {
        params: query,
    });

    return response.data.data;
};

export const getPresensiApi = async (payload: List_Payload): Promise<ListResult<PresensiResult>> => {
    const response = await AUTH_API.get<Responses<ListResult<PresensiResult>>>("/presensi", {
        params: payload,
    });

    return response.data.data;
};

export const updateLocationApi = async (xid: string, location: string, version: number): Promise<PresensiResult> => {
    const response = await AUTH_API.patch<Responses<PresensiResult>>(`/presensi/${xid}/location`, {
        version,
        location,
    });

    return response.data.data;
};

export const updateStatusPaymentApi = async (xid: string, version: number): Promise<PresensiResult> => {
    const response = await AUTH_API.patch<Responses<PresensiResult>>(`/presensi/${xid}/payment`, {
        version,
    });

    return response.data.data;
};

export const updateInformationApi = async (
    xid: string,
    information: string,
    version: number
): Promise<PresensiResult> => {
    const response = await AUTH_API.patch<Responses<PresensiResult>>(`/presensi/${xid}/information`, {
        information,
        version,
    });

    return response.data.data;
};
