import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { useState } from "react";
import { SnackbarContext } from "./SnackbarContext";

type SnackbarProviderProps = {
  children: React.ReactNode;
};
export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [duration, setDuration] = useState<number>(3000);
  const showSnackbar = (
    msg: string,
    severity: AlertColor = "info",
    duration: number = 3000
  ) => {
    setMessage(msg);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };
  const closeSnackBar = () => setOpen(false);
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={closeSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackBar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
