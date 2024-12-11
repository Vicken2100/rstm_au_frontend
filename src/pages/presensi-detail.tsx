import { useParams } from "react-router-dom";
import { Footer } from "../component/footer";
import { useEffect, useState } from "react";
import { PresensiResult } from "../dto/presensi.dto";
import { UangMakanResult } from "../dto/uang-makan.dto";
import { getUangMakanApi } from "../api/uang-makan";
import { getPresensiApi, updateInformationApi, updateLocationApi } from "../api/presensi";
import { DefaultListPayload } from "../dto/common.dto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Component(): JSX.Element {
    const { username } = useParams() as { username: string };

    const [data, setData] = useState<PresensiResult[]>([]);
    const [uangMakan, setUangMakan] = useState<UangMakanResult[]>([]);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getPresensiApi({
                ...DefaultListPayload,
                showAll: true,
                filters: {
                    userName: username,
                    month: month.toString(),
                },
            });

            setData(response.items);
        };

        loadApi();
    }, [username, month]);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getUangMakanApi();

            setUangMakan(response);
        };

        loadApi();
    }, []);

    const monthOptions = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];

    const optionKeterangan = [
        { value: "hadir", label: "hadir" },
        { value: "cuti", label: "cuti" },
        { value: "izin", label: "izin" },
        { value: "sakit", label: "sakit" },
    ];

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Tambahkan judul PDF
        doc.text("Laporan Presensi", 10, 10);

        // Tambahkan tabel menggunakan data
        autoTable(doc, {
            head: [["No", "Nama", "Tanggal", "Mulai", "Selesai", "Lokasi Kerja", "Keterangan"]],
            body: data.map((item, index) => [
                index + 1,
                item.userName,
                item.date,
                item.start || "-",
                item.end || "-",
                item.location || "-",
                item.information,
            ]),
        });

        // Simpan file PDF
        doc.save(`Laporan_Presensi_${monthOptions.find((m) => m.value === month)?.label || ""}.pdf`);
    };

    return (
        <>
            <div className="bg-white">
                <div className="w-full mt-16 px-5 h-screen relative">
                    <p className="font-bold text-2xl">
                        Presensi: <span className="bg-gray-300 border border-gray-500 p-1 rounded-md">{username}</span>
                    </p>
                    <div className="flex w-full gap-1 justify-between">
                        <div className="">
                            <p>Berikut ini adalah rekapitulasi presensi dari karyawan yang Anda pilih.</p>
                        </div>
                        <div className="">
                            <select
                                className="rounded-lg border w-52 border-gray-500 p-1"
                                value={month}
                                onChange={(e) => setMonth(parseInt(e.target.value))}
                            >
                                {monthOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <table className="min-w-full mt-4 border-collapse border border-gray-300">
                        <thead className="bg-[#CEF6C0]">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-center">Tanggal Masuk</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Jam Mulai Kerja</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Jam Selesai Kerja</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Lokasi Kerja</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.date}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {item.start || "-"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.end || "-"}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <select
                                            className="rounded-lg border w-52 border-gray-500 p-1"
                                            value={item.location || "-"}
                                            onChange={async (e) => {
                                                if (e.target.value !== "-") {
                                                    await updateLocationApi(item.xid, e.target.value, item.version);
                                                    window.location.reload();
                                                }
                                            }}
                                        >
                                            <option value="-">-</option>
                                            {uangMakan.map((option) => (
                                                <option key={option.location} value={option.location}>
                                                    {option.location}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <select
                                            className="rounded-lg border w-52 border-gray-500 p-1"
                                            value={item.information || "-"}
                                            onChange={async (e) => {
                                                if (e.target.value !== item.information) {
                                                    await updateInformationApi(item.xid, e.target.value, item.version);
                                                    window.location.reload();
                                                }
                                            }}
                                            disabled={item.information && item.information !== "-"} // Nonaktifkan jika sudah ada keterangan
                                        >
                                            <option value="-">-</option>
                                            {optionKeterangan.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
        </>
    );
}
