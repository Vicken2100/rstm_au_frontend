import { BaseResult } from "./common.dto";

export interface PresensiResult extends BaseResult {
    userName: string;
    jabatan: string;
    date: string;
    start: string | null;
    end: string | null;
    isOnTime: boolean;
    location: string | null;
    mealPay: number;
    overtimePay: number;
    information: string;
    statusPayment: boolean;
}

export interface AttendanceStats {
    userName: string;
    hadir: number;
    sakit: number;
    izin: number;
    cuti: number;
    alpha: number;
    totalDays: number;
}

export interface PresensiStats {
    userName: string;
    hadir: number;
    onTime: number;
    lembur: number;
}
