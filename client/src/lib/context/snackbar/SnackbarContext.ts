import type { AlertColor } from "@mui/material";
import { createContext } from "react";

type SnackbarContextProps = {
  showSnackbar: (msg: string, severity: AlertColor, duration?: number) => void;
};
export const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);
