import React from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "../components/Layout";
import { RegisterForm } from "../components/RegisterForm";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <AuthLayout>
        <RegisterForm onSuccess={() => navigate("/app")} />
      </AuthLayout>
    </>
  );
};
