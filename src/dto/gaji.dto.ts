import { BaseResult } from "./common.dto";

export interface GajiResult extends BaseResult {
    userName: string;
    jabatan: string;
    gajiPokok: number;
    uangMakan: number;
    uangLembur: number;
    tunjanganKeluarga: number;
    tunjanganKesehatan: number;
}
