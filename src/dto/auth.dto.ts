import { UsersResult } from "./users.dto";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResult extends UsersResult {
    token: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface RegisterPayload {
    username: string;
    birthDate: string;
    isMale: boolean;
    nik: string;
    noTelp: string;
    namaBank: string;
    noRek: string;
    namaRekening: string;
    alamatProvinsi: string;
    alamatKota: string;
    alamatKecamatan: string;
    jabatan: string;
    dateIn: string;
    email: string;
    password: string;
    pin: number;
}
