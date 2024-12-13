import { Link } from "react-router-dom";
import { Footer } from "../component/footer";
import { useEffect, useState } from "react";
import { PresensiStats } from "../dto/presensi.dto";
import { getStatsInformationApi } from "../api/presensi";
import { View } from "lucide-react";

export function Component(): JSX.Element {
    const [jabatan, setJabatan] = useState<string | null>("");
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [data, setdata] = useState<PresensiStats[]>([]);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getStatsInformationApi(month, jabatan);

            setdata(response);
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

    return (
        <>
            <div className="bg-white">
                <div className="w-full mt-16 px-5 h-screen relative">
                    <p className="font-bold text-2xl">Penilaian Kinerja</p>
                    <p className="font-normal text-base">
                        Berikut ini adalah tabel penilaian kinerja dari semua karyawan Anda
                    </p>
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

                    <div className="overflow-x-auto">
                        <table className="min-w-full mt-4 border-collapse border border-gray-300">
                            <thead className="bg-[#CEF6C0]">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-center">No</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Nama</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        Poin Ketepatan Waktu
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Poin Kerajinan</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Poin Kehadiran</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Total Poin</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Rincian</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.userName}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.onTime}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.lembur}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.hadir}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.hadir + item.lembur + item.onTime}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <Link
                                                to={`/Kinerja/${item.userName}`}
                                                className=" flex justify-center
                                        text-green-500
                                        hover:text-blue-500 "
                                            >
                                                <View size={25} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="absolute bottom-3 right-5">
                        <button className="bg-[#174A04] rounded-lg px-3 py-1 border border-gray-500 text-white">
                            Ekspor Sebagai PDF
                        </button>
                    </div>
                </div>

                <div className="px-5">
                    <div className="flex gap-2 my-3 items-center">
                        <p className="font-normal ">
                            Keterangan: <br />
                            Poin Ketepatan Waktu adalah poin berdasarkan jam mulai kerja. <br />
                            Poin Kerajinan adalah poin berdasarkan jam selesai kerja. <br />
                            Poin Kehadiran adalah poin berdasarkan jumlah kehadiran dalam 1 bulan
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
