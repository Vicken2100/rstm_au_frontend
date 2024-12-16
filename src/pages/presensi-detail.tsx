import { useParams } from "react-router-dom";
import { Footer } from "../component/footer";
import { useEffect, useState } from "react";
import { PresensiResult } from "../dto/presensi.dto";
import { UangMakanResult } from "../dto/uang-makan.dto";
import { getUangMakanApi } from "../api/uang-makan";
import { getPresensiApi, updateLocationApi } from "../api/presensi";
import { DefaultListPayload } from "../dto/common.dto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Component(): JSX.Element {
    const { username } = useParams() as { username: string };

    const [data, setData] = useState<PresensiResult[]>([]);
    const [uangMakan, setUangMakan] = useState<UangMakanResult[]>([]);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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

            // Sort data by date (newest first)
            const sortedData = response.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setData(sortedData);
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

    const handleUpdateLocation = async (xid: string, location: string, version: number) => {
        if (selectedLocation === null) {
            await updateLocationApi(xid, location, version);
            setSelectedLocation(location);
            setData((prevData) =>
                prevData.map((item) =>
                    item.xid === xid ? { ...item, location } : item
                )
            );
        }
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Tambahkan judul PDF
        doc.text("Laporan Presensi", 10, 10);

        // Tambahkan tabel menggunakan data
        autoTable(doc, {
            head: [["No", "Nama", "Tanggal", "Mulai", "Selesai", "Lokasi Kerja"]],
            body: data.map((item, index) => [
                index + 1,
                item.userName,
                item.date,
                item.start || "-",
                item.end || "-",
                item.location || "-",
            ]),
        });

        // Simpan file PDF
        doc.save(`Laporan_Presensi_${month}.pdf`);
    };

    return (
        <>
            <div className="bg-white min-h-screen flex flex-col">
                <div className="flex-1 px-5 mt-16">
                    <p className="font-bold text-2xl mb-4">
                        Presensi: <span className="bg-gray-300 border border-gray-500 p-1 rounded-md">{username}</span>
                    </p>
                    <div className="flex justify-between items-center mb-4">
                        <p>Berikut ini adalah rekapitulasi presensi untuk karyawan terkait.</p>
                        <select
                            className="rounded-lg border w-52 border-gray-500 p-1"
                            value={month}
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                        >
                            {[...Array(12)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {new Date(0, index).toLocaleString("id-ID", { month: "long" })}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead className="bg-[#CEF6C0]">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Tanggal Masuk</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Jam Mulai Kerja</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Jam Selesai Kerja</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Lokasi Kerja</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.date}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.start || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.end || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <select
                                                className="rounded-lg border w-52 border-gray-500 p-1"
                                                value={item.location || "-"}
                                                onChange={(e) =>
                                                    handleUpdateLocation(
                                                        item.xid,
                                                        e.target.value,
                                                        item.version
                                                    )
                                                }
                                                disabled={
                                                    item.version >= 2
                                                } // Disable other rows
                                            >
                                                <option value="-">-</option>
                                                {uangMakan.map((option) => (
                                                    <option key={option.location} value={option.location}>
                                                        {option.location}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
        </>
    );
}
