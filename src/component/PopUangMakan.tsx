import { useState } from "react";
import { UangMakanResult } from "../dto/uang-makan.dto";
import { createUangMakanApi } from "../api/uang-makan";

const PopUpUangMakan = ({ setOpenPopUp }: { setOpenPopUp: (value: boolean) => void }) => {
    const [lokasiKerja, setLokasiKerja] = useState("");
    const [uangMakan, setUangMakan] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            lokasiKerja,
            uangMakan,
        };

        if (lokasiKerja === "" || uangMakan === "") {
            alert("Data tidak boleh kosong");
            return;
        }

        const payload: UangMakanResult = {
            location: data.lokasiKerja,
            uangMakan: Number(data.uangMakan),
        };

        await createUangMakanApi(payload);
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
                                <label htmlFor="name" className="label">
                                    Lokasi Kerja
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    onChange={(e) => {
                                        setLokasiKerja(e.target.value);
                                    }}
                                    className="w-full input"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="label">
                                    Uang Makan
                                </label>
                                <input
                                    type="number"
                                    onChange={(e) => {
                                        setUangMakan(e.target.value);
                                    }}
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

export default PopUpUangMakan;
