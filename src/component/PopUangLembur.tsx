import { useState } from "react";
import { createUangLemburApi } from "../api/uang-lembur";
import { UangLemburResult } from "../dto/uang-lembur.dto";

const PopUpUangLembur = ({ setOpenPopUp }: { setOpenPopUp: (value: boolean) => void }) => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [uang, setUang] = useState("");

    // Function to ensure 24-hour format
    const handleTimeChange = (value: string, setter: (value: string) => void) => {
        // Remove any non-digit characters
        const cleanTime = value.replace(/[^\d:]/g, "");

        // Split into hours and minutes
        const [hours, minutes] = cleanTime.split(":");

        if (hours && minutes) {
            // Ensure hours are between 00-23 and minutes between 00-59
            const validHours = Math.min(Math.max(parseInt(hours), 0), 23);
            const validMinutes = Math.min(Math.max(parseInt(minutes), 0), 59);

            // Format with leading zeros
            const formattedTime = `${validHours.toString().padStart(2, "0")}:${validMinutes
                .toString()
                .padStart(2, "0")}`;
            setter(formattedTime);
        } else {
            setter(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            mulai: startTime,
            selesai: endTime,
            uang,
        };

        if (startTime === "" || endTime === "" || uang === "") {
            alert("Data tidak boleh kosong");
            return;
        }

        const payload: UangLemburResult = {
            mulai: data.mulai,
            selesai: data.selesai,
            uang: Number(data.uang),
        };

        await createUangLemburApi(payload);
        setOpenPopUp(false);
        window.location.reload();
    };

    return (
        <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 flex items-center justify-center bg-gray-500 z-50 bg-opacity-30"
        >
            <form onSubmit={handleSubmit}>
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">Tambah Opsi Uang Makan</h3>
                        <button
                            onClick={() => setOpenPopUp(false)}
                            type="button"
                            className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
                            data-modal-hide="default-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex mb-6 gap-3">
                            <div>
                                <div className="flex"></div>
                                <label htmlFor="startTime" className="label">
                                    Jam Awal
                                </label>
                                <input
                                    type="time"
                                    id="startTime"
                                    value={startTime}
                                    onChange={(e) => handleTimeChange(e.target.value, setStartTime)}
                                    className="w-full input"
                                    // Force 24-hour format
                                    step="60" // Disable seconds
                                    required
                                />
                                <label htmlFor="endTime" className="label">
                                    Jam Akhir
                                </label>
                                <input
                                    type="time"
                                    id="endTime"
                                    value={endTime}
                                    onChange={(e) => handleTimeChange(e.target.value, setEndTime)}
                                    className="w-full input"
                                    // Force 24-hour format
                                    step="60" // Disable seconds
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="label">
                                    Uang Lembur
                                </label>
                                <input
                                    type="number"
                                    onChange={(e) => setUang(e.target.value)}
                                    id="name"
                                    className="w-full input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
                        <button type="submit" className="btn btn-simpan">
                            Simpan
                        </button>
                        <button onClick={() => setOpenPopUp(false)} className="btn-batal">
                            Batal
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PopUpUangLembur;
