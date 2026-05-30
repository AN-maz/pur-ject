import { createBrowserRouter } from "react-router-dom"

import RootLayout from "@/components/layout/RootLayout"
import Home from "@/routes/Home"
import About from "@/routes/About"
import News from "@/routes/News"
import NewsDetail from "@/routes/NewsDetail"
import StructureDetail from "@/routes/StructureDetail"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "about/structure/:slug",
                element: <StructureDetail />,
            },
            {
                path: "news",
                element: <News />,
            },
            {
                path: "news/:slug",
                element: <NewsDetail />,
            },
        ],
    },
])