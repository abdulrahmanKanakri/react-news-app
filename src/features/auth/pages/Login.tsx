import React from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuthLayout>
        <LoginForm onSuccess={() => navigate("/")} />
      </AuthLayout>
    </>
  );
};
