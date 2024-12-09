import { useEffect, useState } from "react";
import { Footer } from "../component/footer";
import { DefaultListPayload, ListResult } from "../dto/common.dto";
import { UsersResult } from "../dto/users.dto";
import { getListUsersApi } from "../api/users";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

        // Spasi antara bonus dan tabel
        doc.setFontSize(10);
        doc.text("Detail Users:", 10, 40);

        autoTable(doc, {
            startY: 45,
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
                0: { cellWidth: 15 }, // No
                1: { cellWidth: 19 }, // Nama
                2: { cellWidth: 19 }, // Jabatan
                3: { cellWidth: 19 }, // Tanggal Masuk
                4: { cellWidth: 19 }, // Tanggal Lahir
                5: { cellWidth: 19 }, // Jenis Kelamin
                6: { cellWidth: 19 }, // NIK
                7: { cellWidth: 19 }, // No Telp
                8: { cellWidth: 19 }, // Email
                9: { cellWidth: 19 }, // Nama Bank
                10: { cellWidth: 19 }, // Nomor Rekening
                11: { cellWidth: 19 }, // Nama Pemegang Rekening
                12: { cellWidth: 19 }, // Provinsi
                13: { cellWidth: 19 }, // Kabupaten/Kota
                14: { cellWidth: 19 }, // Kecamatan/Kelurahan
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
            didDrawPage: function (data) {
                doc.setFontSize(8);
                doc.text(
                    "Halaman " + doc.getNumberOfPages(),
                    data.settings.margin.left,
                    doc.internal.pageSize.height - 10
                );
            },
        });

        doc.save(`Laporan_Users.pdf`);
    };

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
                <div className="absolute bottom-3 right-5">
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
