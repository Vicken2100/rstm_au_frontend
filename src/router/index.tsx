import { RouteObject } from "react-router-dom";

export const router: RouteObject[] = [
    {
        path: "/",
        lazy: () => import("../layout/layout"),
        hydrateFallbackElement: <>Loading...</>,
        children: [
            {
                index: true,
                path: "/",
                lazy: () => import("../pages/home.page"),
            },
            {
                path: "/DataKaryawan",
                lazy: () => import("../pages/data-karyawan"),
            },
            {
                path: "/Pengaturan",
                lazy: () => import("../pages/pengaturan"),
            },
            {
                path: "/presensi",
                lazy: () => import("../pages/presensi"),
            },
            {
                path: "/presensi/:username",
                lazy: () => import("../pages/presensi-detail"),
            },
            {
                path: "/Kinerja",
                lazy: () => import("../pages/kinerja"),
            },
            {
                path: "/Kinerja/:username",
                lazy: () => import("../pages/kinerja-detail"),
            },
            {
                path: "/penggajian",
                lazy: () => import("../pages/gaji.page"),
            },
            {
                path: "/penggajian/:username",
                lazy: () => import("../pages/gaji-detail.page"),
            },
            {
                path: "/ProfilSaya",
                lazy: () => import("../pages/profile-saya"),
            },
        ],
    },
    {
        path: "/login",
        lazy: () => import("../pages/login.page"),
    },
    {
        path: "/registrasi",
        lazy: () => import("../pages/regis"),
    },
];
