import React from "react";
// import logoApk from "../../img/iconApk.png";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function Component() {
    return (
        <React.Fragment>
            <div className="w-full fixed top-0 z-30 bg-white">
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <img src="/iconApk.png" alt="" />
                        <p className="font-bold text-2xl ml-1">PT. Rekan Tani Sukses Makmur</p>
                    </div>
                    <div className="flex items-center gap-10">
                        <Link to={"/"} className="font-semibold text-black">
                            Beranda
                        </Link>
                        <Link to={"/presensi"} className="font-semibold text-black">
                            Presensi
                        </Link>
                        <Link to={"/penggajian"} className="font-semibold text-black">
                            Penggajian
                        </Link>
                        <Link to={"/Kinerja"} className="font-semibold text-black">
                            Penilaian Kinerja
                        </Link>
                        <Link to={"/ProfilSaya"} className="font-semibold text-black">
                            <IoPersonCircle size={40} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" bg-white " style={{ minHeight: "100vh" }}>
                <div className="flex-1">
                    <main className=" relative flex">
                        <div className="w-full pt-10">{<Outlet />}</div>
                    </main>
                </div>
            </div>
        </React.Fragment>
    );
}
