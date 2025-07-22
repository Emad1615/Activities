import { Avatar, MenuItem } from "@mui/material";
import { NavLink } from "react-router";

export default function Logo() {
  return (
    <MenuItem
      component={NavLink}
      to="/"
      sx={{
        display: "flex",
        gap: 1,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Avatar
        alt="logo"
        src="/images/logo.png"
        sx={{ width: 45, height: 45 }}
      />
    </MenuItem>
  );
}
