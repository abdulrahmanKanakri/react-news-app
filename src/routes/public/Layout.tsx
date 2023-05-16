import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/providers/auth";

export const PublicRoutesLayout: React.FC = () => {
  const { hasToken } = useAuth();

  if (hasToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
