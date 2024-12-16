import { BaseResult } from "./common.dto";
import { List_Payload } from './common.dto';

export interface GajiResult extends BaseResult {
    userName: string;
    jabatan: string;
    gajiPokok: number;
    uangMakan: number;
    uangLembur: number;
    tunjanganKeluarga: number;
    tunjanganKesehatan: number;
    bonus?: number; // Tambahkan properti bonus
}
export type GajiListResponse = {
    items: GajiResult[];
    count: number;
};

// payload untuk mengambil data gaji berdasarkan bulan dan jabatan
export type GajiListPayload = List_Payload & {
    month: string; // bulan yang ingin diambil
    jabatan: string; // jabatan yang ingin diambil (Sales, Sopir, dll.)
};

