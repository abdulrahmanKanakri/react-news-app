import { Navigate, RouteObject } from "react-router-dom";

import { NewsFeed } from "@/features/news/pages/NewsFeed";

import { ProtectedRoutesLayout } from "./Layout";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoutesLayout />,
    children: [
      {
        path: "",
        element: <NewsFeed />,
      },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
