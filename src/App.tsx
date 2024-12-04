import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
    const browser = createBrowserRouter(router);
    return (
        <>
            <RouterProvider router={browser} />
        </>
    );
}

export default App;
