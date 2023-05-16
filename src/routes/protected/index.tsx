import { Navigate, RouteObject } from "react-router-dom";

import { NewsFeed } from "@/features/news/pages/NewsFeed";
import { Profile } from "@/features/user/pages/Profile";
import { AccountSettings } from "@/features/user/pages/AccountSettings";

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
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "account-settings",
        element: <AccountSettings />,
      },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
