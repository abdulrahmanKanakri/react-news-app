import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/providers/auth";
import MainLayout from "@/components/Layout/MainLayout";

export const ProtectedRoutesLayout: React.FC = () => {
  const { hasToken } = useAuth();

  if (!hasToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};
