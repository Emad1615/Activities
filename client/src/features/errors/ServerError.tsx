import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Paper
      elevation={3}
      sx={{
        p: 6,
      }}
    >
      {state.error ? (
        <>
          <Typography variant="h3" color="secondary" sx={{ py: 2, px: 4 }}>
            This is a server error
          </Typography>
          <Divider />
          <Typography variant="h6" color="secondary" px={4} pt={1} >
            {state.error.message}
          </Typography>
          <Typography color="text.secondary" variant="body1" px={4}>
            {state.error.details}
          </Typography>
        </>
      ) : (
        <Typography variant="h3" color="secondary">
          Internal server error
        </Typography>
      )}
    </Paper>
  );
}
