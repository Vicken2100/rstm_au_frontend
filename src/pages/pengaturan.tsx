import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getJabatanGajiApi, updateJabatanGajiApi } from "../api/jabatan-gaji";
import { deleteUangLemburApi, getUangLemburApi } from "../api/uang-lembur";
import { deleteUangMakanApi, getUangMakanApi } from "../api/uang-makan";
import { Footer } from "../component/footer";
import PopUpBonus from "../component/PopBonus";
import PopUpUangLembur from "../component/PopUangLembur";
import PopUpUangMakan from "../component/PopUangMakan";
import { BonusResult } from "../dto/bonus.dto";
import { JabatanGajiResult } from "../dto/jabatan-gaji.dto";
import { UangLemburResult } from "../dto/uang-lembur.dto";
import { UangMakanResult } from "../dto/uang-makan.dto";
import { deleteBonusApi, getBonusApi } from "../api/bonus";

export function Component(): JSX.Element {
    const [OpenPopUpBonus, SetOpenPopUpBonus] = useState(false);
    const [OpenPopUpMakanan, SetOpenPopUpMakan] = useState(false);
    const [OpenPopUpLembur, SetOpenPopUpLembur] = useState(false);

    const [position, setPosition] = useState<JabatanGajiResult[]>([]);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getJabatanGajiApi();

            setPosition(response);
        };

        loadApi();
    }, []);

    const handlePositionChange = (index: number, field: keyof JabatanGajiResult, value: string) => {
        const updatedPositions = [...position]; // Create a copy of the positions array

        if (field === "jabatan") {
            // For text field (jabatan)
            updatedPositions[index][field] = value;
        } else {
            // For number fields (gajiPokok, tunjanganKeluarga, tunjanganKesehatan)
            // Remove non-numeric characters and convert to number
            const numericValue = Number(value.replace(/[^\d]/g, ""));
            updatedPositions[index][field] = numericValue;
        }

        setPosition(updatedPositions);
    };

    const handleUpdateGajiJabatan = async () => {
        await updateJabatanGajiApi(position);
        window.location.reload();
    };

    const [mealAllowances, setMealAllowances] = useState<UangMakanResult[]>([]);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getUangMakanApi();

            setMealAllowances(response);
        };

        loadApi();
    }, []);

    const [overtimeRates, setOvertimeRates] = useState<UangLemburResult[]>([]);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getUangLemburApi();

            setOvertimeRates(response);
        };

        loadApi();
    }, []);

    const [bonusRanges, setBonusRanges] = useState<BonusResult[]>([]);

    useEffect(() => {
        const loadApi = async () => {
            const response = await getBonusApi();

            setBonusRanges(response);
        };

        loadApi();
    }, []);

    const evaluationIndicators = [
        { indicator: "Jam Mulai Kerja", percentage: "20" },
        { indicator: "Jam Selesai Kerja", percentage: "40" },
        { indicator: "Kehadiran", percentage: "60" },
    ];

    return (
        <div>
            {OpenPopUpMakanan && <PopUpUangMakan setOpenPopUp={SetOpenPopUpMakan} />}
            {OpenPopUpBonus && <PopUpBonus setOpenPopUp={SetOpenPopUpBonus} />}
            {OpenPopUpLembur && <PopUpUangLembur setOpenPopUp={SetOpenPopUpLembur} />}
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">Pengaturan</h1>
                <p className="text-gray-600">Atur semua perhitungan dasar dari penggajian di sini.</p>

                {/* Positions and Salary Details */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Jabatan dan Rincian Gaji</h2>
                    </div>
                    <div className="p-4">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Jabatan</th>
                                        <th className="px-4 py-3 border-b">Gaji Pokok</th>
                                        <th className="px-4 py-3 border-b">Tunjangan Keluarga</th>
                                        <th className="px-4 py-3 border-b">Tunjangan Kesehatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {position.map((position, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border-b">{position.jabatan}</td>
                                            <td className="px-4 py-3 border-b">
                                                Rp.
                                                <input
                                                    type="text"
                                                    value={position.gajiPokok.toLocaleString("id-ID")}
                                                    onChange={(e) =>
                                                        handlePositionChange(index, "gajiPokok", e.target.value)
                                                    }
                                                    className="w-28 px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-3 border-b">
                                                Rp.
                                                <input
                                                    type="text"
                                                    value={position.tunjanganKeluarga.toLocaleString("id-ID")}
                                                    onChange={(e) =>
                                                        handlePositionChange(index, "tunjanganKeluarga", e.target.value)
                                                    }
                                                    className="w-24 px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-3 border-b">
                                                Rp.
                                                <input
                                                    type="text"
                                                    value={position.tunjanganKesehatan.toLocaleString("id-ID")}
                                                    onChange={(e) =>
                                                        handlePositionChange(
                                                            index,
                                                            "tunjanganKesehatan",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-24 px-2 py-1 border rounded"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => handleUpdateGajiJabatan()}
                                className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Meal Allowances */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Uang Makan</h2>
                    </div>
                    <div className="p-4">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Lokasi Kerja</th>
                                        <th className="px-4 py-3 border-b">Uang Makan</th>
                                        <th className="px-4 py-3 border-b">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mealAllowances.map((allowance, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border-b">{allowance.location}</td>
                                            <td className="px-4 py-3 border-b">
                                                Rp.{allowance.uangMakan.toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3 border-b">
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={async () => {
                                                        await deleteUangMakanApi(allowance.location);
                                                        window.location.reload();
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            onClick={() => SetOpenPopUpMakan(true)}
                            className="mt-4 px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
                        >
                            <span className="mr-2">+</span>
                            Tambah Baris
                        </button>
                    </div>
                </div>

                {/* Overtime Rates */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Uang Lembur</h2>
                    </div>
                    <div className="p-4">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Jam</th>
                                        <th className="px-4 py-3 border-b">Uang Lembur</th>
                                        <th className="px-4 py-3 border-b">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {overtimeRates.map((rate, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border-b">{`${rate.mulai} - ${rate.selesai}`}</td>
                                            <td className="px-4 py-3 border-b">
                                                Rp.{rate.uang.toLocaleString("id-ID")}
                                            </td>
                                            <td
                                                className="px-4 py-3 border-b"
                                                onClick={async () => {
                                                    await deleteUangLemburApi(rate.mulai);
                                                    window.location.reload();
                                                }}
                                            >
                                                <button className="text-red-500 hover:text-red-700">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            onClick={() => SetOpenPopUpLembur(true)}
                            className="mt-4 px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
                        >
                            <span className="mr-2">+</span>
                            Tambah Baris
                        </button>
                    </div>
                </div>

                {/* Bonus Ranges */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Bonus</h2>
                    </div>
                    <div className="p-4">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Interval Poin</th>
                                        <th className="px-4 py-3 border-b">Bonus</th>
                                        <th className="px-4 py-3 border-b">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bonusRanges.map((bonus, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border-b">{`${bonus.start} - ${bonus.end}`}</td>
                                            <td className="px-4 py-3 border-b">{`${bonus.startBonus}  - ${bonus.endBonus}`}</td>
                                            <td className="px-4 py-3 border-b">
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={async () => {
                                                        deleteBonusApi(bonus.start.toString());
                                                        window.location.reload();
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            onClick={() => SetOpenPopUpBonus(true)}
                            className="mt-4 px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
                        >
                            <span className="mr-2">+</span>
                            Tambah Baris
                        </button>
                    </div>
                </div>

                {/* Evaluation Indicators */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Indikator Penilaian</h2>
                    </div>
                    <div className="p-4">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Indikator</th>
                                        <th className="px-4 py-3 border-b">Persentase</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {evaluationIndicators.map((indicator, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border-b">{indicator.indicator}</td>
                                            <td className="px-4 py-3 border-b">
                                                <input
                                                    type="text"
                                                    value={indicator.percentage}
                                                    className="w-12 px-2 py-1 border rounded mr-1"
                                                />{" "}
                                                %
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700">
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
