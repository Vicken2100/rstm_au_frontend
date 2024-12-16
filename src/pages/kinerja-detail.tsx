import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBonusApi } from "../api/bonus";
import { getPresensiApi } from "../api/presensi";
import { Footer } from "../component/footer";
import { BonusResult } from "../dto/bonus.dto";
import { DefaultListPayload } from "../dto/common.dto";
import { PresensiResult } from "../dto/presensi.dto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Component(): JSX.Element {
    const { username } = useParams() as { username: string };
    const [data, setData] = useState<PresensiResult[]>([]);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [bonusRanges, setBonusRanges] = useState<BonusResult[]>([]);
    const [bonus, setBonus] = useState("");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getBonusApi();
            setBonusRanges(response);
        };
        loadApi();
    }, []);

    useEffect(() => {
        const totalPoints = data.length ? data.reduce((sum, item) => sum + calculate(item), 0) : 0;

        if (bonusRanges) {
            const matchingRange = bonusRanges.find((range) => totalPoints >= range.start && totalPoints <= range.end);

            if (matchingRange) {
                setBonus(
                    `Rp. ${matchingRange.startBonus.toLocaleString(
                        "id-ID"
                    )} - Rp. ${matchingRange.endBonus.toLocaleString("id-ID")}`
                );
                setTotal(totalPoints);
            } else {
                setBonus("Tidak Ada Bonus");
                setTotal(totalPoints);
            }
        }
    }, [data, bonusRanges]);

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
    }, [month]);

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

    const calculate = (item: PresensiResult): number => {
        const hadir = item.information === "hadir" ? 1 : 0;
        const onTime = item.isOnTime && item.information === "hadir" ? 1 : 0;
        const overTime = item.overtimePay > 0 ? 1 : 0;
        return hadir + onTime + overTime;
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text(`Laporan Presensi - ${username}`, 10, 10);

        // Informasi Bonus Range
        doc.setFontSize(12);
        doc.text(`Rekomendasi Bonus Berdasarkan Poin: ${total}`, 10, 20);
        doc.text(`Bonus Range: ${bonus || "Tidak Ada Bonus"}`, 10, 30);

        // Spasi antara bonus dan tabel
        doc.setFontSize(10);
        doc.text("Detail Presensi:", 10, 40);

        autoTable(doc, {
            startY: 45,
            head: [
                [
                    "No",
                    "Tanggal",
                    "Keterangan",
                    "Jam Mulai Kerja",
                    "Jam Selesai Kerja",
                    "Poin Ketepatan Waktu",
                    "Poin Kerajinan",
                    "Poin Kehadiran",
                    "Total Poin",
                ],
            ],
            body: data.map((item, index) => [
                index + 1,
                item.date,
                item.information,
                item.start,
                item.end,
                item.isOnTime && item.information === "hadir" ? 1 : 0,
                item.overtimePay > 0 ? 1 : 0,
                item.information === "hadir" ? 1 : 0,
                calculate(item),
            ]),
        });

        doc.save(`Laporan_Presensi_${username}.pdf`);
    };

    return (
        <>
            <div className="bg-white">
                <div className="w-full mt-16 px-5 h-screen relative">
                    <p className="font-bold text-2xl">
                        Penilaian kinerja: {" "}
                        <span className="bg-gray-300 border border-gray-500 p-1 rounded-md">{username}</span>{" "}
                    </p>
                    <div className="flex w-full gap-1 justify-between">
                        <div className="">
                            <p>Berikut ini adalah penilaian kinerja dari karyawan yang Anda pilih.</p>
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

                    <div className="overflow-x-auto">
                        <table className="min-w-full mt-4 border-collapse border border-gray-300">
                            <thead className="bg-[#CEF6C0]">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-center">No</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Tanggal</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Jam Mulai Kerja</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Jam Selesai Kerja</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Poin Ketepatan Waktu</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Poin Kerajinan</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Poin Kehadiran</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Total Poin</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.date}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.start}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.end}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.isOnTime && item.information === "hadir" ? 1 : 0}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.overtimePay > 0 ? 1 : 0}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {item.information === "hadir" ? 1 : 0}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {calculate(item)}
                                        </td>
                                    </tr>
                                ))}
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

                <div className="px-5">
                    <p className="font-bold text-2xl">
                        Rekomendasi bonus berdasarkan poin: {" "}
                        <span className="bg-gray-300 border border-gray-500 p-1 rounded-md">{bonus}</span>{" "}
                    </p>
                    <div className="flex gap-2 my-3 items-center">
                        <p className="font-normal ">
                            Keterangan: <br />
                            Poin Ketepatan Waktu adalah poin berdasarkan jam mulai kerja. <br />
                            Poin Kerajinan adalah poin berdasarkan jam selesai kerja. <br />
                            Poin Kehadiran adalah poin berdasarkan jumlah kehadiran dalam 1 bulan.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
