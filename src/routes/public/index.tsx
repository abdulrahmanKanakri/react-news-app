import { Navigate, RouteObject } from "react-router-dom";

import { Login } from "@/features/auth/pages/Login";
import { Register } from "@/features/auth/pages/Register";
import { PublicRoutesLayout } from "./Layout";

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicRoutesLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "*", element: <Navigate to="/login" /> },
    ],
  },
];
