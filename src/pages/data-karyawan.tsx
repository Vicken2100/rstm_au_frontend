import { useEffect, useState } from "react";
import { Footer } from "../component/footer";
import { DefaultListPayload, ListResult } from "../dto/common.dto";
import { UsersResult } from "../dto/users.dto";
import { getListUsersApi } from "../api/users";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

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

    const handleExportPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });
        doc.text(`Laporan Users`, 10, 10);

        autoTable(doc, {
            startY: 20,
            head: [
                [
                    "No",
                    "Nama",
                    "Jabatan",
                    "Tanggal Masuk Pegawai",
                    "Tanggal Lahir",
                    "Jenis Kelamin",
                    "NIK",
                    "No Telp",
                    "Email",
                    "Nama Bank",
                    "Nomor Rekening",
                    "Nama Pemegang Rekening",
                    "Provinsi",
                    "Kabupaten/Kota",
                    "Kecamatan/Kelurahan",
                ],
            ],
            body: items.items.map((item, index) => [
                index + 1,
                item.username,
                item.jabatan,
                item.dateIn,
                item.birthDate,
                item.isMale ? "Laki - laki" : "Perempuan",
                item.nik,
                item.noTelp,
                item.email,
                item.namaBank,
                item.noRek,
                item.namaRekening,
                item.alamatProvinsi,
                item.alamatKota,
                item.alamatKecamatan,
            ]),
            theme: "grid",
            styles: {
                fontSize: 8,
                cellPadding: 3,
            },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 30 },
                2: { cellWidth: 30 },
                3: { cellWidth: 25 },
                4: { cellWidth: 25 },
                5: { cellWidth: 25 },
                6: { cellWidth: 30 },
                7: { cellWidth: 25 },
                8: { cellWidth: 30 },
                9: { cellWidth: 30 },
                10: { cellWidth: 30 },
                11: { cellWidth: 30 },
                12: { cellWidth: 30 },
                13: { cellWidth: 30 },
                14: { cellWidth: 30 },
            },
            headStyles: {
                fillColor: [66, 66, 66],
                textColor: 255,
                fontSize: 8,
                fontStyle: "bold",
                halign: "center",
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            margin: { top: 20 },
            pageBreak: "auto",
            tableWidth: "auto",
        });

        doc.save(`Laporan_Users.pdf`);
    };

    return (
        <div className="bg-white">
            <div className="w-full mt-16 px-5 pb-24"> {/* Tambahkan `pb-24` untuk memberi padding bawah */}
                <p className="font-bold text-2xl">Data Karyawan</p>

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full border-collapse border border-gray-300">
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
                                <th className="border border-gray-300 px-4 py-2 text-center">Kecamatan/Kelurahan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {loading ? (
                                <tr>
                                    <td colSpan={15} className="text-center py-4">Loading...</td>
                                </tr>
                            ) : (
                                items.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.xid}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.username}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.jabatan}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.dateIn}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.birthDate}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.isMale ? "Laki - laki" : "Perempuan"}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.nik}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.noTelp}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.email}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.namaBank}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.noRek}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.namaRekening}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.alamatProvinsi}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.alamatKota}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.alamatKecamatan}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        className="bg-[#174A04] rounded-lg px-3 py-1 border border-gray-500 text-white"
                    >
                        <Link to={"/registrasi"}>Daftarkan Akun Baru</Link>
                    </button>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleExportPDF}
                        className="bg-[#174A04] rounded-lg px-3 py-1 border border-gray-500 text-white"
                    >
                        Ekspor Sebagai PDF
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
