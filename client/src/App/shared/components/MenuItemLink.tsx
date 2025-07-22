import { MenuItem } from "@mui/material";
import { NavLink } from "react-router";

type Props = {
  children?: React.ReactNode;
  to: string;
};
export default function MenuItemLink({ children, to }: Props) {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      sx={{
        fontSize: ".8rem",
        textTransform: "uppercase",
        fontWeight: "500",
        "&.active": {
          color: "#b39cd0",
        },
      }}
    >
      {children}
    </MenuItem>
  );
}
