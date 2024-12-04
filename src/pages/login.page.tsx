import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/login";
import { USER_ACCESS_TOKEN } from "../constants/token";
import Cookies from "js-cookie";

export function Component() {
    const email = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);

    const handleLogin = async () => {
        try {
            if (!email.current || !password.current || !email.current.value || !password.current.value) {
                return;
            }
            const response = await login({
                email: email.current.value,
                password: password.current.value,
            });

            Cookies.set(USER_ACCESS_TOKEN, response.token.accessToken);
            navigate("/");
        } catch {
            setError(true);
        }
    };

    return (
        <React.Fragment>
            <div className="w-full fixed top-0 z-30 bg-white">
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <img src="/iconApk.png" alt="" />
                        <p className="font-bold text-2xl ml-1">PT. Rekan Tani Sukses Makmur</p>
                    </div>
                    <IoPersonCircle size={40} />
                </div>
            </div>
            <div className=" bg-gradient-to-t from-[#ADE563] to-white " style={{ minHeight: "100vh" }}>
                <div className="flex-1">
                    <main className=" relative flex">
                        <div className="w-full pt-10">
                            {" "}
                            <div className=" justify-center py-3 items-center w-full">
                                <div className="w-full flex justify-center">
                                    <div className="">
                                        <div className="w-full flex justify-center">
                                            <img src={"/person.png"} alt="" />
                                        </div>
                                        <div className="w-full flex justify-center">
                                            <h1 className="font-bold text-2xl">
                                                Masuk dengan akun untuk menelusuri semua fitur yang ada.
                                            </h1>
                                        </div>
                                        <p className="text-center mt-3 font-bold">
                                            Belum ada akun? <Link to={"/registrasi"}>Daftar</Link>
                                        </p>
                                        <div className="flex w-full justify-center mt-4">
                                            <div className="text-center w-full">
                                                <input
                                                    className="w-[40%] px-2 py-3 border bg-[#D5F2CB] border-gray-500 rounded-3xl text-sm"
                                                    placeholder="Email Pengguna"
                                                    type="email"
                                                    ref={email}
                                                />
                                                <br />
                                                <input
                                                    className="w-[40%] mt-3 px-2 py-3 border bg-[#D5F2CB] border-gray-500 rounded-3xl text-sm"
                                                    placeholder="Password"
                                                    type="password"
                                                    ref={password}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-3">
                                            <button
                                                onClick={handleLogin}
                                                className="bg-[#174A04] text-white px-4 py-2 rounded-3xl"
                                            >
                                                Masuk
                                            </button>
                                        </div>
                                        {error && (
                                            <p className="text-red-700 text-center">Username Atau Password salah</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </React.Fragment>
    );
}
