import { Navigate, RouteObject } from "react-router-dom";

import { NewsFeed } from "@/features/news/pages/NewsFeed";
import { NewsSearch } from "@/features/news/pages/NewsSearch";
import { Preferences } from "@/features/user/pages/Preferences";
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
        path: "search",
        element: <NewsSearch />,
      },
      {
        path: "preferences",
        element: <Preferences />,
      },
      {
        path: "account-settings",
        element: <AccountSettings />,
      },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
