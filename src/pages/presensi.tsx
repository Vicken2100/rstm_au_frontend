import { Link } from "react-router-dom";
import { Footer } from "../component/footer";
import { useEffect, useState } from "react";
import { AttendanceStats } from "../dto/presensi.dto";
import { getStatsApi } from "../api/presensi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { View } from "lucide-react";

export function Component(): JSX.Element {
    const [data, setData] = useState<AttendanceStats[]>([]);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [jabatan, setJabatan] = useState<string | null>("");

    useEffect(() => {
        const loadApi = async () => {
            const response = await getStatsApi(month, jabatan);
            setData(response);
        };

        loadApi();
    }, [month, jabatan]);

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

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Tambahkan judul PDF
        doc.text("Laporan Presensi", 10, 10);

        // Tambahkan tabel menggunakan data
        autoTable(doc, {
            head: [["No", "Nama", "Hadir"]],
            body: data.map((item, index) => [
                index + 1,
                item.userName,
                item.hadir,
            ]),
        });

        // Simpan file PDF
        doc.save(`Laporan_Presensi_${monthOptions.find((m) => m.value === month)?.label || ""}.pdf`);
    };

    return (
        <div className="bg-white">
            <div className="w-full mt-16 px-5 h-screen relative">
                <p className="font-bold text-2xl">Presensi</p>
                <div className="flex w-full gap-1 justify-end">
                    <select
                        className="rounded-lg border w-52 border-gray-500 p-1"
                        value={jabatan || ""}
                        onChange={(e) => setJabatan(e.target.value)}
                    >
                        <option value="">Semua Jabatan</option>
                        <option value="Sales">Sales</option>
                        <option value="Sopir">Sopir</option>
                    </select>
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

                <table className="min-w-full mt-4 border-collapse border border-gray-300 mx-auto">
                    <thead className="bg-[#CEF6C0]">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-center">No</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Nama</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Total Jumlah Hadir</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Rincian</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.userName}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.hadir}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <Link
                                        to={`/presensi/${item.userName}`}
                                        className="flex justify-center text-green-500 hover:text-blue-500"
                                    >
                                        <View size={25} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="absolute bottom-3 right-5">
                    <button
                        onClick={() => handleExportPDF()}
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
