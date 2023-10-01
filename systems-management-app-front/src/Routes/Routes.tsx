import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SystemCreate from "../Pages/SystemCreate";
import SystemSearch from "../Pages/SystemSearch";
import SystemUpdate from "../Pages/SystemUpdate";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <SystemSearch />
            },
            {
                path: "system-search",
                element: <SystemSearch />
            },
            {
                path: "system-create",
                element: <SystemCreate />
            },
            {
                path: "system-update",
                element: <SystemUpdate />
            },
            // {
            //     path: "*",
            //     element: <h1>404</h1>
            // }
        ]
    }
]);