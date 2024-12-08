import { useEffect, useState } from "react";
import { GajiResult } from "../dto/gaji.dto";
import { getGaji } from "../api/gaji";
import { DefaultListPayload } from "../dto/common.dto";
import { Footer } from "../component/footer";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Component(): JSX.Element {
    const [jabatan, setJabatan] = useState<string>("");
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [data, setData] = useState<GajiResult[]>([]);
    const [totals, setTotals] = useState({
        gajiPokok: 0,
        uangMakan: 0,
        uangLembur: 0,
        tunjanganKeluarga: 0,
        tunjanganKesehatan: 0,
        total: 0,
    });

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

    const calculateTotal = (item: GajiResult): number => {
        return item.gajiPokok + item.uangMakan + item.uangLembur + item.tunjanganKeluarga + item.tunjanganKesehatan;
    };

    const calculateTotals = (items: GajiResult[]) => {
        const newTotals = items.reduce(
            (acc, item) => ({
                gajiPokok: acc.gajiPokok + item.gajiPokok,
                uangMakan: acc.uangMakan + item.uangMakan,
                uangLembur: acc.uangLembur + item.uangLembur,
                tunjanganKeluarga: acc.tunjanganKeluarga + item.tunjanganKeluarga,
                tunjanganKesehatan: acc.tunjanganKesehatan + item.tunjanganKesehatan,
                total: acc.total + calculateTotal(item),
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

    useEffect(() => {
        const loadApi = async () => {
            const response = await getGaji({
                ...DefaultListPayload,
                showAll: true,
                filters: {
                    month: month.toString(),
                    jabatan: jabatan,
                },
            });

            setData(response.items);
            calculateTotals(response.items);
        };

        loadApi();
    }, [month, jabatan]);

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Add title and period
        doc.setFontSize(16);
        doc.text("Laporan Penggajian", 14, 15);
        doc.setFontSize(11);
        doc.text(`Periode: ${monthOptions[month - 1].label}`, 14, 25);
        if (jabatan) {
            doc.text(`Jabatan: ${jabatan}`, 14, 32);
        }

        // Create salary table
        autoTable(doc, {
            startY: 40,
            head: [
                [
                    "No",
                    "Nama",
                    "Gaji Pokok",
                    "Uang Makan",
                    "Uang Lembur",
                    "Tunjangan Keluarga",
                    "Tunjangan Kesehatan",
                    "Total",
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
                formatCurrency(calculateTotal(item)),
            ]),
            foot: [
                [
                    "Total",
                    "",
                    formatCurrency(totals.gajiPokok),
                    formatCurrency(totals.uangMakan),
                    formatCurrency(totals.uangLembur),
                    formatCurrency(totals.tunjanganKeluarga),
                    formatCurrency(totals.tunjanganKesehatan),
                    formatCurrency(totals.total),
                ],
            ],
            theme: "grid",
            styles: {
                fontSize: 8,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [206, 246, 192],
                textColor: [0, 0, 0],
                fontStyle: "bold",
            },
            footStyles: {
                fillColor: [23, 74, 4],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
        });

        // Add summary
        const currentY = (doc as any).lastAutoTable.finalY + 15;
        doc.text(`Total Pengeluaran: ${formatCurrency(totals.total)}`, 14, currentY);

        // Save PDF
        const filename = jabatan
            ? `Penggajian_${jabatan}_${monthOptions[month - 1].label}.pdf`
            : `Penggajian_${monthOptions[month - 1].label}.pdf`;

        doc.save(filename);
    };

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
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        Tunjangan Kesehatan
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Gaji Total</th>
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
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {formatCurrency(item.gajiPokok)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {formatCurrency(item.uangMakan)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {formatCurrency(item.uangLembur)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {formatCurrency(item.tunjanganKeluarga)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {formatCurrency(item.tunjanganKesehatan)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {formatCurrency(calculateTotal(item))}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <Link
                                                to={`/penggajian/${item.userName}`}
                                                className="bg-[#DEFABB] p-1 rounded-md border border-gray-500"
                                            >
                                                Tampilkan
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2} className="bg-[#174A04]"></td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        Total pengeluaran <br />
                                        {formatCurrency(totals.gajiPokok)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        Total pengeluaran <br />
                                        {formatCurrency(totals.uangMakan)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        Total pengeluaran <br />
                                        {formatCurrency(totals.uangLembur)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        Total pengeluaran <br />
                                        {formatCurrency(totals.tunjanganKeluarga)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        Total pengeluaran <br />
                                        {formatCurrency(totals.tunjanganKesehatan)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        Total pengeluaran <br />
                                        {formatCurrency(totals.total)}
                                    </td>
                                    <td className="bg-[#174A04]"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="absolute bottom-3 right-5">
                        <button
                            onClick={exportToPDF}
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
