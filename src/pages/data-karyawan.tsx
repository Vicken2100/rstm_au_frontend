import { useEffect, useState } from "react";
import { Footer } from "../component/footer";
import { DefaultListPayload, ListResult } from "../dto/common.dto";
import { UsersResult } from "../dto/users.dto";
import { getListUsersApi } from "../api/users";

export function Component() {
    const [items, setItems] = useState<ListResult<UsersResult>>({
        items: [],
        count: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getListUsers = async () => {
            try {
                const result = await getListUsersApi({
                    ...DefaultListPayload,
                    showAll: true,
                });

                setItems(result);
            } catch {
                console.log("error");
            }

            setLoading(false);
        };

        getListUsers();
    }, []);

    return (
        <div className="bg-white">
            <div className="w-full mt-16 px-5 h-screen relative">
                <p className="font-bold text-2xl">Data Karyawan</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full mt-4 border-collapse border border-gray-300">
                        <thead className="bg-[#CEF6C0]">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Nama Lengkap</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Jabatan</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Tanggal Masuk Pegawai</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Tanggal Lahir</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Jenis Kelamin</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">NIK</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">No Telp</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Nama Bank</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Nomor Rekening</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Nama Pemegang Rekening</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Provinsi</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Kabupaten/Kota</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">
                                    Kecamatan/ <br />
                                    Kelurahan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {loading ? (
                                <>
                                    <tr aria-colspan={15}>
                                        <p className="text center">loading...</p>
                                    </tr>
                                </>
                            ) : (
                                <>
                                    {items.items.map((item) => {
                                        return (
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.xid}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.username}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.jabatan}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.dateIn}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.birthDate}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.isMale ? "Laki - laki" : "Perempuan"}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.nik}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.noTelp}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.email}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.namaBank}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.noRek}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.namaRekening}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.alamatProvinsi}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.alamatKota}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    {item.alamatKecamatan}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
}
