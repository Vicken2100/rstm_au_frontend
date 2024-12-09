import React, { useEffect } from "react";
// import logoApk from "../../img/iconApk.png";
import { IoPersonCircle } from "react-icons/io5";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { USER_ACCESS_TOKEN } from "../constants/token";
import { jwtDecode } from "jwt-decode";

export function Component() {
    const { pathname, search } = useLocation();

    const token = Cookies.get(USER_ACCESS_TOKEN);

    if (!token) {
        return <Navigate to={"/login"} />;
    }
    const auth = jwtDecode(token) as { data: { email: string } };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname, search]);

    useEffect(() => {
        const accessToken = Cookies.get(USER_ACCESS_TOKEN);

        if (!accessToken) {
            window.location.href = "/login";
        }
    }, []);

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
                        <Link
                            to={auth.data.email === "admin" ? "/presensi" : `/presensi/${auth.data.email}`}
                            className="font-semibold text-black"
                        >
                            Presensi
                        </Link>
                        <Link
                            to={auth.data.email === "admin" ? "/penggajian" : `/penggajian/${auth.data.email}`}
                            className="font-semibold text-black"
                        >
                            Penggajian
                        </Link>
                        <Link
                            to={auth.data.email === "admin" ? "/Kinerja" : `/Kinerja/${auth.data.email}`}
                            className="font-semibold text-black"
                        >
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
