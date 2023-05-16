import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { AccountSettings } from "./AccountSettings";

interface HeaderProps {
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logout }) => {
  return (
    <>
      <Toolbar disableGutters>
        <NewspaperIcon sx={{ mr: 1 }} />
        <Typography
          component="a"
          href="/"
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "0.15s opacity",
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          News Aggregator
        </Typography>
        <AccountSettings onLogoutClick={logout} />
      </Toolbar>
    </>
  );
};

export default Header;
