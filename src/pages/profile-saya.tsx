import Cookies from "js-cookie";
import { USER_ACCESS_TOKEN } from "../constants/token";
import { useEffect, useState } from "react";
import { UsersResult } from "../dto/users.dto";
import { getProfile, updateProfile } from "../api/users";

export function Component(): JSX.Element {
    const [data, setData] = useState<UsersResult>();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        birthDate: "",
        isMale: true,
        nik: "",
        noTelp: "",
        namaBank: "",
        noRek: "",
        namaRekening: "",
        alamatProvinsi: "",
        alamatKota: "",
        alamatKecamatan: "",
    });

    useEffect(() => {
        const loadApi = async () => {
            try {
                const response = await getProfile();
                setData(response);
                // Pre-fill form with existing data
                setFormData({
                    username: response.username || "",
                    password: "", // Don't pre-fill password
                    birthDate: response.birthDate || "",
                    isMale: response.isMale,
                    nik: response.nik || "",
                    noTelp: response.noTelp || "",
                    namaBank: response.namaBank || "",
                    noRek: response.noRek || "",
                    namaRekening: response.namaRekening || "",
                    alamatProvinsi: response.alamatProvinsi || "",
                    alamatKota: response.alamatKota || "",
                    alamatKecamatan: response.alamatKecamatan || "",
                });
            } catch (error) {
                console.error("Error loading profile:", error);
                alert("Gagal memuat profil");
            }
        };

        loadApi();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "radio") {
            const radioInput = e.target as HTMLInputElement;
            setFormData((prev) => ({
                ...prev,
                isMale: radioInput.value === "true",
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (data?.xid && data?.version) {
                await updateProfile({
                    ...formData,
                    version: data.version,
                });
                alert("Profil berhasil diperbarui");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Gagal memperbarui profil");
        }
    };

    return (
        <>
            <div className="py-3 px-4">
                <div className="w-full">
                    <p className="text-2xl font-bold">Profil Saya</p>
                </div>
                <div className="w-full mt-7">
                    <div className="">
                        <div className="mt-3">
                            <div className="grid grid-cols-2 gap-10">
                                <form onSubmit={handleSubmit} className="w-full">
                                    <p className="font-bold">Data Pribadi</p>
                                    <div className="grid gap-y-2">
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="username"
                                            placeholder="Nama Pengguna"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="password"
                                            name="password"
                                            placeholder="Kata Sandi (kosongkan jika tidak ingin mengubah)"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="birthDate"
                                            placeholder="Tempat/Tanggal Lahir*"
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                        />
                                        <div className="flex gap-4 items-center">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="isMale"
                                                    value="true"
                                                    checked={formData.isMale}
                                                    onChange={handleInputChange}
                                                />{" "}
                                                Laki-laki
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="isMale"
                                                    value="false"
                                                    checked={!formData.isMale}
                                                    onChange={handleInputChange}
                                                />{" "}
                                                Perempuan
                                            </label>
                                        </div>
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="nik"
                                            placeholder="Nomor Induk Kependudukan*"
                                            value={formData.nik}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="tel"
                                            name="noTelp"
                                            placeholder="Nomor Telepon Pribadi*"
                                            value={formData.noTelp}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="namaBank"
                                            placeholder="Nama Bank"
                                            value={formData.namaBank}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="noRek"
                                            placeholder="Nomor Rekening"
                                            value={formData.noRek}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="namaRekening"
                                            placeholder="Nama Pemegang Rekening"
                                            value={formData.namaRekening}
                                            onChange={handleInputChange}
                                        />

                                        <p className="font-bold">Alamat Pribadi</p>
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="alamatProvinsi"
                                            placeholder="Provinsi*"
                                            value={formData.alamatProvinsi}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="alamatKota"
                                            placeholder="Kabupaten/Kota*"
                                            value={formData.alamatKota}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="inp-res"
                                            type="text"
                                            name="alamatKecamatan"
                                            placeholder="Kecamatan*"
                                            value={formData.alamatKecamatan}
                                            onChange={handleInputChange}
                                        />

                                        <button
                                            type="submit"
                                            className="bg-[#174A04] mt-3 text-white px-4 py-2 rounded-xl"
                                        >
                                            Simpan
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                Cookies.remove(USER_ACCESS_TOKEN);
                                                window.location.reload();
                                            }}
                                            className="bg-[#ca0606] mt-3 text-white px-4 py-2 rounded-xl"
                                        >
                                            Keluar Akun
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
