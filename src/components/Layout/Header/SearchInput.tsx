import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha("#27353d", 0.07),
  "&:hover": {
    backgroundColor: alpha("#27353d", 0.15),
    "& .clear-icon-wrapper": {
      opacity: 1,
    },
  },
  transition: "0.23s background",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
}));

const ClearIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (searchInputRef.current) {
      onSearch(searchInputRef.current.value);
    }
  };

  const clearSearchValue = () => {
    if (searchInputRef.current?.value) {
      searchInputRef.current.value = "";
      onSearch("");
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <IconButton
          sx={{ p: 0 }}
          aria-label="search"
          size="small"
          onClick={handleSubmit}
          onMouseDown={(e) => e.preventDefault()}
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={searchInputRef}
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            handleSubmit();
          }
        }}
      />
      <ClearIconWrapper className="clear-icon-wrapper">
        <IconButton
          aria-label="clear"
          size="small"
          onClick={clearSearchValue}
          onMouseDown={(e) => e.preventDefault()}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      </ClearIconWrapper>
    </Search>
  );
};
