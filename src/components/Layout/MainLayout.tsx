import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuth } from "@/providers/auth";

import Footer from "./Footer";
import Header from "./Header";

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
      <Box
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            backgroundColor: "#f3f4f6",
            top: 0,
            left: 0,
            width: "100%",
            height: 560,
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Header logout={handleLogout} />
          <Main>{children}</Main>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
