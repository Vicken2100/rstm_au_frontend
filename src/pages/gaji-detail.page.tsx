import { useParams } from "react-router-dom";
import { Footer } from "../component/footer";
import { useEffect, useState } from "react";
import { PresensiResult } from "../dto/presensi.dto";
import { getPresensiApi, updateStatusPaymentApi } from "../api/presensi";
import { DefaultListPayload } from "../dto/common.dto";
import { GajiResult } from "../dto/gaji.dto";
import { getGaji } from "../api/gaji";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function Component(): JSX.Element {
    const { username } = useParams() as { username: string };
    const [data, setData] = useState<PresensiResult[]>([]);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [totals, setTotals] = useState({
        mealPay: 0,
        overtimePay: 0,
    });
    const [gaji, setGaji] = useState<GajiResult>();

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

    useEffect(() => {
        const loadApi = async () => {
            const response = await getGaji({
                ...DefaultListPayload,
                showAll: true,
                filters: {
                    month: month.toString(),
                    userName: username,
                },
            });

            setGaji(response.items[0]);
        };

        loadApi();
    }, [month]);

    const calculateOvertime = (start: string | null, end: string | null): string => {
        if (!start || !end) return "0 Jam";

        const endHour = parseInt(end.split("-")[0]);

        let overtimeHours = 0;
        if (endHour > 17) {
            // Assuming normal work hours end at 17:00
            overtimeHours = endHour - 17;
        }

        return `${overtimeHours} Jam`;
    };

    const formatTime = (time: string | null): string => {
        return time ? `${time}:00` : "-";
    };

    const formatDate = (date: string): string => {
        const [day, month, year] = date.split("-");
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const loadApi = async () => {
            const response = await getPresensiApi({
                ...DefaultListPayload,
                showAll: true,
                filters: {
                    userName: username,
                    month: month.toString(),
                    information: "hadir",
                },
            });

            setData(response.items);

            // Calculate totals
            const newTotals = response.items.reduce(
                (acc, item) => ({
                    mealPay: acc.mealPay + item.mealPay,
                    overtimePay: acc.overtimePay + item.overtimePay,
                }),
                { mealPay: 0, overtimePay: 0 }
            );

            setTotals(newTotals);
        };

        loadApi();
    }, [month, username]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        const totalGaji = gaji
            ? gaji.gajiPokok + gaji.tunjanganKeluarga + gaji.tunjanganKesehatan + totals.mealPay + totals.overtimePay
            : 0;

        // Add title
        doc.setFontSize(16);
        doc.text(`Rincian Gaji - ${username}`, 14, 15);
        doc.setFontSize(11);
        doc.text(`Periode: ${monthOptions[month - 1].label}`, 14, 25);

        // Attendance table
        autoTable(doc, {
            startY: 35,
            head: [
                [
                    "No",
                    "Tanggal",
                    "Lokasi",
                    "Jam Mulai",
                    "Jam Selesai",
                    "Uang Makan",
                    "Uang Lembur",
                    "Jam Lembur",
                    "Status",
                ],
            ],
            body: data.map((item, index) => [
                index + 1,
                formatDate(item.date),
                item.location || "-",
                formatTime(item.start),
                formatTime(item.end),
                formatCurrency(item.mealPay),
                formatCurrency(item.overtimePay),
                calculateOvertime(item.start, item.end),
                item.statusPayment ? "Diambil" : "Belum Diambil",
            ]),
            foot: [
                [
                    "",
                    "",
                    "",
                    "",
                    "",
                    `Total: ${formatCurrency(totals.mealPay)}`,
                    `Total: ${formatCurrency(totals.overtimePay)}`,
                    "",
                    "",
                ],
            ],
        });

        // Salary details table
        const currentY = (doc as any).lastAutoTable.finalY + 15;
        autoTable(doc, {
            startY: currentY,
            head: [["Komponen", "Jumlah"]],
            body: [
                ["Gaji Pokok", formatCurrency(gaji?.gajiPokok || 0)],
                ["Tunjangan Keluarga", formatCurrency(gaji?.tunjanganKeluarga || 0)],
                ["Tunjangan Kesehatan", formatCurrency(gaji?.tunjanganKesehatan || 0)],
                ["Total Uang Makan", formatCurrency(totals.mealPay)],
                ["Total Uang Lembur", formatCurrency(totals.overtimePay)],
                ["Total Gaji", formatCurrency(totalGaji)],
            ],
            styles: { cellPadding: 2 },
            theme: "striped",
        });

        // Save the PDF
        doc.save(`Gaji_${username}_${monthOptions[month - 1].label}.pdf`);
    };

    return (
        <>
            <div className="bg-white">
                <div className="w-full mt-16 px-5 h-screen relative">
                    <p className="font-bold text-2xl">
                        Penggajian:{" "}
                        <span className="bg-gray-300 border border-gray-500 p-1 rounded-md">{username}</span>
                    </p>
                    <div className="flex w-full gap-1 justify-start">
                        <div className="">
                            <p>Berikut ini adalah rincian gaji anda.</p>
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
                                <th className="border border-gray-300 px-4 py-2 text-center">No</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Tanggal Masuk</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Lokasi Kerja</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Jam Mulai Kerja</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Jam Selesai Kerja</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Uang Makan</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Uang Lembur</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Jam Lembur</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatDate(item.date)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {item.location || "-"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatTime(item.start)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatTime(item.end)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(item.mealPay)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatCurrency(item.overtimePay)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {calculateOvertime(item.start, item.end)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {item.statusPayment ? (
                                            "Diambil"
                                        ) : (
                                            <select
                                                onChange={async (e) => {
                                                    if (e.target.value === "diambil") {
                                                        await updateStatusPaymentApi(item.xid, item.version);
                                                        alert("berhail mengambil gaji");
                                                        window.location.reload();
                                                    }
                                                }}
                                                className="rounded-lg border w-full border-gray-500 p-1"
                                            >
                                                <option value="">Pilih</option>
                                                <option value="diambil">Diambil</option>
                                            </select>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={5} className="bg-[#174A04]"></td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    Total Uang Makan:
                                    <br />
                                    {formatCurrency(totals.mealPay)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    Total Uang Lembur:
                                    <br />
                                    {formatCurrency(totals.overtimePay)}
                                </td>
                                <td colSpan={2} className="bg-[#174A04]"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="absolute bottom-3 right-5">
                        <button
                            onClick={exportToPDF}
                            className="bg-[#174A04] rounded-lg px-3 py-1 border border-gray-500 text-white"
                        >
                            Ekspor Sebagai PDF
                        </button>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex gap-3 items-end">
                        <div className="">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 bg-[#174A04] text-white px-6 py-1">
                                            Gaji Pokok
                                        </td>
                                        <td className="border border-gray-300 bg-[white] text-black px-6 py-1">
                                            {gaji ? formatCurrency(gaji.gajiPokok) : "Rp 0"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 bg-[#174A04] text-white px-6 py-1">
                                            Tunjangan Keluarga
                                        </td>
                                        <td className="border border-gray-300 bg-[white] text-black px-6 py-1">
                                            {gaji ? formatCurrency(gaji.tunjanganKeluarga) : "Rp 0"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 bg-[#174A04] text-white px-6 py-1">
                                            Tunjangan Kesehatan
                                        </td>
                                        <td className="border border-gray-300 bg-[white] text-black px-6 py-1">
                                            {gaji ? formatCurrency(gaji.tunjanganKesehatan) : "Rp 0"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 bg-[#174A04] text-white px-6 py-1">
                                            Bonus
                                        </td>
                                        <td className="border border-gray-300 bg-[white] text-black px-6 py-1">Rp 0</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 bg-[#174A04] text-white px-6 py-1">
                                            Total
                                        </td>
                                        <td className="border border-gray-300 bg-[white] text-black px-6 py-1">
                                            {gaji
                                                ? formatCurrency(
                                                      gaji.gajiPokok + gaji.tunjanganKeluarga + gaji.tunjanganKesehatan
                                                  )
                                                : "Rp 0"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="">
                            <div className="flex">
                                <div className="mr-3">
                                    <input type="radio" />
                                </div>
                                <p>Gaji Diterima</p>
                            </div>
                            <p>
                                Di Verifikasi Oleh <span className="bg-gray-200 text-black font-bold">Admin</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 my-3 items-center">
                        <p className="font-bold">Total Gaji + Uang Makan dan Uang Lembur:</p>
                        <input
                            type="text"
                            className="bg-[#E5F1D5] border border-green-900 py-1 px-2"
                            value={
                                gaji
                                    ? formatCurrency(
                                          gaji.gajiPokok +
                                              gaji.tunjanganKeluarga +
                                              gaji.tunjanganKesehatan +
                                              totals.mealPay +
                                              totals.overtimePay
                                      )
                                    : "Rp 0"
                            }
                            readOnly
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
