import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import Footer from "./Footer";
import Header from "./Header";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const Main = styled("main")({
  paddingTop: "3rem",
});

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // const { logout, isError, isLoading, isSuccess } = useLogout();
  // const { setUser } = useAuth();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
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
