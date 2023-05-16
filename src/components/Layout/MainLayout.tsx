import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import Footer from "./Footer";
import Header from "./Header";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuth } from "@/providers/auth";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const Main = styled("main")({
  paddingTop: "3rem",
});

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { logout } = useLogout();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUser(undefined);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header logout={handleLogout} />
        <Main>{children}</Main>
      </Container>
      <Footer
        title="News App"
        description="A great app to have news around the world in one place."
      />
    </>
  );
};

export default MainLayout;
