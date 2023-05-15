import { Navigate, RouteObject } from "react-router-dom";

import { useLogout } from "@/features/auth/hooks/useLogout";

import { ProtectedRoutesLayout } from "./Layout";
import { useAuth } from "@/providers/auth";

const Home: React.FC = () => {
  const { logout, isError, isLoading, isSuccess } = useLogout();
  const { setUser } = useAuth();

  return (
    <>
      <h1>common route home is here</h1>
      <h5>error: {isError}</h5>
      <h5>success: {isSuccess}</h5>
      <h5>loading: {isLoading}</h5>
      <button
        onClick={async () => {
          await logout();
          setUser(undefined);
        }}
        disabled={isLoading}
      >
        logout
      </button>
    </>
  );
};

export const protectedRoutes: RouteObject[] = [
  {
    path: "/app",
    element: <ProtectedRoutesLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
