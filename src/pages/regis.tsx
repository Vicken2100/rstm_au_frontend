import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterPayload } from "../dto/auth.dto";
import { register } from "../api/login";

export function Component(): JSX.Element {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterPayload>({
        username: "",
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
        jabatan: "",
        dateIn: "",
        email: "",
        password: "",
        pin: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "isMale" ? value === "laki" : name === "pin" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Berhasil Mengisi formulir");
            navigate("/");
        } catch {
            alert("isi form dengan benar");
        }
    };

    return (
        <>
            <div className="w-full fixed top-0 z-30 bg-white">
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <img src={"/iconApk.png"} alt="" />
                        <p className="font-bold text-2xl ml-1">PT. Rekan Tani Sukses Makmur</p>
                    </div>
                    <IoPersonCircle size={40} />
                </div>
            </div>
            <div className="bg-gradient-to-t from-[#ADE563] to-white" style={{ minHeight: "100vh" }}>
                <div className="flex-1">
                    <main className="relative flex">
                        <div className="w-full pt-10">
                            <div className="py-3 px-4">
                                <div className="w-full">
                                    <p className="text-2xl font-bold">Registrasi Akun Pegawai</p>
                                    <p>Silakan isi data di bawah ini</p>
                                </div>
                                <form onSubmit={handleSubmit} className="w-full mt-7">
                                    <div className="mt-3">
                                        <div className="grid grid-cols-2 gap-10">
                                            <div className="w-full">
                                                <p className="font-bold">Data Pribadi</p>
                                                <div className="grid gap-y-2">
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="username"
                                                        placeholder="Nama Lengkap*"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="birthDate"
                                                        placeholder="Tempat/Tanggal Lahir*"
                                                        value={formData.birthDate}
                                                        onChange={handleChange}
                                                    />
                                                    <select
                                                        name="isMale"
                                                        className="inp-res"
                                                        value={formData.isMale ? "laki" : "perempuan"}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" disabled hidden>
                                                            Pilih Jenis Kelamin
                                                        </option>
                                                        <option value="laki">Laki-Laki</option>
                                                        <option value="perempuan">Perempuan</option>
                                                    </select>
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="nik"
                                                        placeholder="Nomor Induk Kependudukan*"
                                                        value={formData.nik}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="noTelp"
                                                        placeholder="Nomor Telepon Pribadi*"
                                                        value={formData.noTelp}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="namaBank"
                                                        placeholder="Nama Bank"
                                                        value={formData.namaBank}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="noRek"
                                                        placeholder="Nomor Rekening"
                                                        value={formData.noRek}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="namaRekening"
                                                        placeholder="Nama Pemegang Rekening"
                                                        value={formData.namaRekening}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="font-bold">Alamat Pribadi</p>
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="alamatProvinsi"
                                                        placeholder="Provinsi*"
                                                        value={formData.alamatProvinsi}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="alamatKota"
                                                        placeholder="Kabupaten/Kota*"
                                                        value={formData.alamatKota}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="text"
                                                        name="alamatKecamatan"
                                                        placeholder="Kecamatan*"
                                                        value={formData.alamatKecamatan}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <p className="font-bold">Data Pekerjaan</p>
                                                <div className="grid gap-y-2">
                                                    <select
                                                        name="jabatan"
                                                        className="inp-res"
                                                        value={formData.jabatan}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" disabled hidden>
                                                            Jabatan
                                                        </option>
                                                        <option value="Sopir">Sopir</option>
                                                        <option value="Sales">Sales</option>
                                                    </select>
                                                    <input
                                                        className="inp-res"
                                                        type="date"
                                                        name="dateIn"
                                                        placeholder="Tanggal Masuk Jadi Pegawai*"
                                                        value={formData.dateIn}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="font-bold">Data Akun</p>
                                                    <p>
                                                        Lengkapi data akun untuk mulai menggunakan situs Rekan Tani
                                                        Sukses Makmur.
                                                    </p>
                                                    <input
                                                        className="inp-res"
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email*"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="password"
                                                        name="password"
                                                        placeholder="Kata Sandi*"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="password"
                                                        placeholder="Konfirmasi Kata Sandi*"
                                                    />
                                                    <input
                                                        className="inp-res"
                                                        type="number"
                                                        name="pin"
                                                        placeholder="Pilih Angka 1-99"
                                                        value={formData.pin || ""}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-sm text-end m-0">Masukkan Rangge Angka 1-99</p>
                                                    <p>Pastikan Angka yang di isi tidak sama dengan Karyawan lain</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        type="submit"
                                                        className="bg-[#174A04] mt-3 text-white px-4 py-2 rounded-xl"
                                                    >
                                                        Daftar
                                                    </button>
                                                    <Link to="/">Kembali</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
