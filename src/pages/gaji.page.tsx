import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GajiResult } from "../dto/gaji.dto";
import { Footer } from "../component/footer";
import { Eye } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Component(): JSX.Element {
    const [data, setData] = useState<GajiResult[]>([]);
    const [totals, setTotals] = useState({
        gajiPokok: 0,
        uangMakan: 0,
        uangLembur: 0,
        tunjanganKeluarga: 0,
        tunjanganKesehatan: 0,
        total: 0,
    });
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [jabatan, setJabatan] = useState<string>("");

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

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const calculateTotals = (items: GajiResult[]) => {
        const newTotals = items.reduce(
            (acc, item) => ({
                gajiPokok: acc.gajiPokok + item.gajiPokok,
                uangMakan: acc.uangMakan + item.uangMakan,
                uangLembur: acc.uangLembur + item.uangLembur,
                tunjanganKeluarga: acc.tunjanganKeluarga + item.tunjanganKeluarga,
                tunjanganKesehatan: acc.tunjanganKesehatan + item.tunjanganKesehatan,
                total: acc.total +
                    item.gajiPokok +
                    item.uangMakan +
                    item.uangLembur +
                    item.tunjanganKeluarga +
                    item.tunjanganKesehatan,
            }),
            {
                gajiPokok: 0,
                uangMakan: 0,
                uangLembur: 0,
                tunjanganKeluarga: 0,
                tunjanganKesehatan: 0,
                total: 0,
            }
        );

        setTotals(newTotals);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(16);
        doc.text("Laporan Penggajian", 14, 15);
        doc.setFontSize(11);
        doc.text(`Periode: ${monthOptions[month - 1].label}`, 14, 25);

        // Add table
        autoTable(doc, {
            startY: 35,
            head: [
                [
                    "No",
                    "Nama",
                    "Gaji Pokok",
                    "Uang Makan",
                    "Uang Lembur",
                    "Tunjangan Keluarga",
                    "Tunjangan Kesehatan",
                    "Gaji Total",
                ],
            ],
            body: data.map((item, index) => [
                index + 1,
                item.userName,
                formatCurrency(item.gajiPokok),
                formatCurrency(item.uangMakan),
                formatCurrency(item.uangLembur),
                formatCurrency(item.tunjanganKeluarga),
                formatCurrency(item.tunjanganKesehatan),
                formatCurrency(
                    item.gajiPokok +
                        item.uangMakan +
                        item.uangLembur +
                        item.tunjanganKeluarga +
                        item.tunjanganKesehatan
                ),
            ]),
            foot: [
                [
                    "",
                    "",
                    formatCurrency(totals.gajiPokok),
                    formatCurrency(totals.uangMakan),
                    formatCurrency(totals.uangLembur),
                    formatCurrency(totals.tunjanganKeluarga),
                    formatCurrency(totals.tunjanganKesehatan),
                    formatCurrency(totals.total),
                ],
            ],
        });

        // Save the PDF
        doc.save(`Laporan_Penggajian_${monthOptions[month - 1].label}.pdf`);
    };

    useEffect(() => {
        const loadApi = async () => {
            if (process.env.NODE_ENV === "development") {
                const dummyData: GajiResult[] = [
                    {
                        userName: "Audrey K",
                        jabatan: "Sales",
                        gajiPokok: 3700000,
                        uangMakan: 500000,
                        uangLembur: 100000,
                        tunjanganKeluarga: 3700000,
                        tunjanganKesehatan: 3700000,
                        xid: "dummy-xid-1",
                        updatedAt: new Date(2024, 10, 30).getTime(), // 30 November 2024
                        createdAt: new Date(2024, 10, 1).getTime(),  // 1 November 2024
                        modifiedBy: {
                            xid: "admin-xid-1",
                            username: "Admin",
                        }, // Sesuai dengan tipe ModifiedBy
                        version: 1,

                    },
                    {
                        userName: "Suryanto",
                        jabatan: "Sales",
                        gajiPokok: 3700000,
                        uangMakan: 250000,
                        uangLembur: 100000,
                        tunjanganKeluarga: 3700000,
                        tunjanganKesehatan: 3700000,
                        xid: "dummy-xid-1",
                        updatedAt: new Date(2024, 10, 30).getTime(), // 30 November 2024
                        createdAt: new Date(2024, 10, 1).getTime(),  // 1 November 2024
                        modifiedBy: {
                            xid: "admin-xid-1",
                            username: "Admin",
                        }, // Sesuai dengan tipe ModifiedBy
                        version: 1,

                    },

                ];
                console.log("Using dummy data");
                setData(dummyData);
                calculateTotals(dummyData);
            } else {
                console.log("Fetching data from API");
                // Call your API here and set the data.
            }
        };

        loadApi();
    }, [month, jabatan]);

    return (
        <>
            <div className="bg-white">
                <div className="w-full mt-16 px-5 h-screen relative">
                    <p className="font-bold text-2xl">Penggajian</p>
                    <div className="flex w-full gap-1 justify-end">
                        <select
                            className="rounded-lg border w-52 border-gray-500 p-1"
                            value={jabatan}
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
                                    <th className="border border-gray-300 px-4 py-2 text-center">Gaji Pokok</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Total Uang Makan</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Total Uang Lembur</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Tunjangan Keluarga</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Tunjangan Kesehatan</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Gaji Total</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Rincian</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.userName}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{formatCurrency(item.gajiPokok)}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{formatCurrency(item.uangMakan)}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{formatCurrency(item.uangLembur)}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{formatCurrency(item.tunjanganKeluarga)}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{formatCurrency(item.tunjanganKesehatan)}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {formatCurrency(
                                                item.gajiPokok +
                                                    item.uangMakan +
                                                    item.uangLembur +
                                                    item.tunjanganKeluarga +
                                                    item.tunjanganKesehatan
                                            )}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <Link
                                                to={`/penggajian/${item.userName}`}
                                                className="flex justify-center text-green-500 hover:text-blue-500"
                                            >
                                                <Eye size={25} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2} className="bg-[#174A04]"></td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(totals.gajiPokok)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(totals.uangMakan)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(totals.uangLembur)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(totals.tunjanganKeluarga)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(totals.tunjanganKesehatan)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(totals.total)}
                                    </td>
                                    <td className="bg-[#174A04]"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={exportToPDF}
                                className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-900"
                            >
                                Ekspor Sebagai PDF
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
