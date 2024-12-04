import { Link } from "react-router-dom";
import { Footer } from "../component/footer";

export function Component() {
    return (
        <div className="relative w-full">
            <img className="w-full bg-fixed top-0 object-cover" src={"/bg-home.png"} alt="Background" />

            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-bold  text-white text-center absolute top-44">
                    <p className="text-2xl">PT. REKAN TANI SUKSES MAKMUR</p>
                    <p className="text-lg mt-5">
                        Sejak 2021 membantu petani Indonesia dalam bidang
                        <br />
                        perdagangan pupuk dan pestisida.
                    </p>
                </div>
            </div>
            <div className="relative w-full">
                <div className="absolute z-10 top-[-40px] w-full">
                    <div className="grid grid-cols-4 gap-20 w-full px-16">
                        <div className="rounded-lg px-4 py-11 flex justify-center items-center bg-[#E5FCDD]">
                            Pemesanan yang Efisien
                        </div>
                        <div className="rounded-lg px-4 py-11 flex justify-center items-center bg-[#E5FCDD]">
                            Ekonomis
                        </div>
                        <div className="rounded-lg px-4 py-11 flex justify-center items-center bg-[#E5FCDD]">Cepat</div>
                        <div className="rounded-lg px-4 py-11 flex justify-center items-center bg-[#E5FCDD]">
                            Terpercaya
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white w-full px-16 pt-20 pb-44 ">
                <div className="mt-20">
                    <p className="text-3xl font-bold">Menu Pegawai</p>
                    <div className="grid grid-cols-5 w-full gap-16 mt-9 relative z-10">
                        <Link
                            to={"/presensi"}
                            className="bg-[#D5F2CB] border border-[#174A04] rounded-lg p-6 flex justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex flex-col justify-center items-center w-full">
                                <img className="mb-2" src={"/presensi.png"} alt="Presensi" />
                                <p className="text-center">Presensi</p>
                            </div>
                        </Link>
                        <Link
                            to={"/Kinerja"}
                            className="bg-[#D5F2CB] border border-[#174A04] rounded-lg p-6 flex justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex flex-col justify-center items-center w-full">
                                <img className="mb-2" src={"/penilaian-kinerja.png"} alt="Penilaian Kinerja" />
                                <p className="text-center">Penilaian Kinerja</p>
                            </div>
                        </Link>
                        <Link
                            to={"/penggajian"}
                            className="bg-[#D5F2CB] border border-[#174A04] rounded-lg p-6 flex justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex flex-col justify-center items-center w-full">
                                <img className="mb-2" src={"/penggajian.png"} alt="Penggajian" />
                                <p className="text-center">Penggajian</p>
                            </div>
                        </Link>
                        <Link
                            to={"/DataKaryawan"}
                            className="bg-[#D5F2CB] border border-[#174A04] rounded-lg p-6 flex justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex flex-col justify-center items-center w-full">
                                <img className="mb-2" src={"/data-karyawan.png"} alt="Data Karyawan" />
                                <p className="text-center">Data Karyawan</p>
                            </div>
                        </Link>
                        <Link
                            to={"/Pengaturan"}
                            className="bg-[#D5F2CB] border border-[#174A04] rounded-lg p-6 flex justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex flex-col justify-center items-center w-full">
                                <img className="mb-2" src={"/pengaturan.png"} alt="Pengaturan" />
                                <p className="text-center">Pengaturan</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
