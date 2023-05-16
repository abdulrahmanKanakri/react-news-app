import { Navigate, RouteObject } from "react-router-dom";

import { NewsFeed } from "@/features/news/pages/NewsFeed";

import { ProtectedRoutesLayout } from "./Layout";

function Profile() {
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}

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
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
