import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { deepPurple } from "@mui/material/colors";

import { AppPaths } from "@/constants/app-paths";
import { useAuth } from "@/providers/auth";
import { getNameInitials } from "@/utils";

interface SettingsMenuProps {
  onLogoutClick: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  onLogoutClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {getNameInitials(user?.name ?? "")}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(AppPaths.profile);
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(AppPaths.settings);
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => onLogoutClick()}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
