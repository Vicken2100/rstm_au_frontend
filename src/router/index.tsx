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
        ],
    },
    {
        path: "/login",
        lazy: () => import("../pages/login.page"),
    },
];
