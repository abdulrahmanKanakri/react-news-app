import React from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Box from "@mui/material/Box";

import { AppPaths } from "@/constants/app-paths";

import { SettingsMenu } from "./SettingsMenu";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logout }) => {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar
        disableGutters
        sx={{
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "unset" },
          rowGap: { xs: 1, sm: "unset" },
        }}
      >
        <NewspaperIcon sx={{ mr: 1 }} />
        <Typography
          component="a"
          href={AppPaths.newsFeed}
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
        <Box
          sx={{
            marginLeft: { sm: "auto" },
            width: { xs: "100%", sm: "auto" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchInput
            onSearch={(q) => {
              navigate(AppPaths.newsSearch, { state: { q } });
            }}
          />
          <SettingsMenu onLogoutClick={logout} />
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
